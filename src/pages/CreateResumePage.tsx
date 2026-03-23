import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Briefcase, Code, FolderOpen, Award, Plus, Trash2, ChevronRight, ChevronLeft, Sparkles, Target } from 'lucide-react';
import { analyzeResumeForm, DOMAIN_ROLES, JOB_KEYWORDS } from '../lib/resumeAnalyzer';
import DomainSelector from '../components/DomainSelector';
import type { ResumeFormData, ResumeAnalysis } from '../types';

interface CreateResumePageProps {
  onAnalysisComplete: (analysis: ResumeAnalysis, text: string) => void;
}

const STEPS = [
  { id: 'role', label: 'Target Role', icon: Target },
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'certifications', label: 'Certifications', icon: Award },
];

const defaultForm: ResumeFormData = {
  personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', summary: '' },
  education: [{ degree: '', institution: '', year: '', gpa: '' }],
  experience: [{ title: '', company: '', duration: '', description: '' }],
  skills: [],
  projects: [{ name: '', description: '', tech: '' }],
  certifications: [],
};

function InputField({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
        style={{ background: 'rgba(6,9,26,0.8)', border: '1px solid rgba(30,45,74,0.8)', color: '#e2e8f0' }}
        onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(30,45,74,0.8)'; }}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors resize-none"
        style={{ background: 'rgba(6,9,26,0.8)', border: '1px solid rgba(30,45,74,0.8)', color: '#e2e8f0' }}
        onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(30,45,74,0.8)'; }}
      />
    </div>
  );
}

export default function CreateResumePage({ onAnalysisComplete }: CreateResumePageProps) {
  const [step, setStep] = useState(0);
  const [jobRole, setJobRole] = useState('');
  const [form, setForm] = useState<ResumeFormData>(defaultForm);
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const getDomainData = (role: string) => {
    for (const [, data] of Object.entries(DOMAIN_ROLES)) {
      if (data.roles.includes(role)) return data;
    }
    return null;
  };
  const domainData = jobRole ? getDomainData(jobRole) : null;

  // Skill suggestions: if role selected, show role-specific keywords; else generic
  const skillSuggestions = jobRole && JOB_KEYWORDS[jobRole]
    ? JOB_KEYWORDS[jobRole].slice(0, 14)
    : ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS', 'REST API', 'Agile', 'Figma', 'Machine Learning', 'Excel'];

  const updatePersonal = (field: string, value: string) =>
    setForm(f => ({ ...f, personalInfo: { ...f.personalInfo, [field]: value } }));

  const addEducation = () =>
    setForm(f => ({ ...f, education: [...f.education, { degree: '', institution: '', year: '', gpa: '' }] }));
  const updateEducation = (i: number, field: string, value: string) =>
    setForm(f => ({ ...f, education: f.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e) }));
  const removeEducation = (i: number) =>
    setForm(f => ({ ...f, education: f.education.filter((_, idx) => idx !== i) }));

  const addExperience = () =>
    setForm(f => ({ ...f, experience: [...f.experience, { title: '', company: '', duration: '', description: '' }] }));
  const updateExperience = (i: number, field: string, value: string) =>
    setForm(f => ({ ...f, experience: f.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e) }));
  const removeExperience = (i: number) =>
    setForm(f => ({ ...f, experience: f.experience.filter((_, idx) => idx !== i) }));

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !form.skills.includes(s)) setForm(f => ({ ...f, skills: [...f.skills, s] }));
    setSkillInput('');
  };
  const removeSkill = (skill: string) =>
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));

  const addProject = () =>
    setForm(f => ({ ...f, projects: [...f.projects, { name: '', description: '', tech: '' }] }));
  const updateProject = (i: number, field: string, value: string) =>
    setForm(f => ({ ...f, projects: f.projects.map((p, idx) => idx === i ? { ...p, [field]: value } : p) }));
  const removeProject = (i: number) =>
    setForm(f => ({ ...f, projects: f.projects.filter((_, idx) => idx !== i) }));

  const addCert = () => {
    if (certInput.trim()) {
      setForm(f => ({ ...f, certifications: [...f.certifications, certInput.trim()] }));
      setCertInput('');
    }
  };
  const removeCert = (i: number) =>
    setForm(f => ({ ...f, certifications: f.certifications.filter((_, idx) => idx !== i) }));

  const handleAnalyze = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1800));
    const analysis = analyzeResumeForm(form, jobRole || undefined);
    const text = [form.personalInfo.fullName, form.personalInfo.email, form.personalInfo.summary,
      ...form.skills, ...form.experience.map(e => e.description), ...form.certifications].join(' ');
    setGenerating(false);
    onAnalysisComplete(analysis, text);
    navigate('/analysis');
  };

  const renderStep = () => {
    switch (step) {
      // ── Step 0: Target Role ──
      case 0: return (
        <div className="space-y-4">
          <DomainSelector value={jobRole} onChange={setJobRole} inline />
          {!jobRole && (
            <p className="text-sm text-yellow-400/80">⚠ Select a role for accurate scoring, or skip for auto-detection</p>
          )}
        </div>
      );

      // ── Step 1: Personal Info ──
      case 1: return (
        <div className="space-y-4">
          {jobRole && domainData && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2"
              style={{ background: `${domainData.color}12`, border: `1px solid ${domainData.color}30` }}>
              <span className="text-xl">{domainData.icon}</span>
              <div>
                <p className="text-xs text-slate-400">Scoring for</p>
                <p className="text-sm font-semibold" style={{ color: domainData.color }}>{jobRole}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" value={form.personalInfo.fullName} onChange={v => updatePersonal('fullName', v)} placeholder="John Smith" required />
            <InputField label="Email" value={form.personalInfo.email} onChange={v => updatePersonal('email', v)} placeholder="john@email.com" type="email" required />
            <InputField label="Phone" value={form.personalInfo.phone} onChange={v => updatePersonal('phone', v)} placeholder="+1-555-0123" />
            <InputField label="Location" value={form.personalInfo.location} onChange={v => updatePersonal('location', v)} placeholder="San Francisco, CA" />
            <InputField label="LinkedIn" value={form.personalInfo.linkedin} onChange={v => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/yourname" />
            <InputField label="Portfolio / GitHub" value={form.personalInfo.portfolio} onChange={v => updatePersonal('portfolio', v)} placeholder="github.com/yourname" />
          </div>
          <TextAreaField label="Professional Summary" value={form.personalInfo.summary} onChange={v => updatePersonal('summary', v)}
            placeholder={jobRole ? `Experienced ${jobRole} with X years of experience...` : 'Experienced professional with X years of experience...'} rows={4} />
        </div>
      );

      // ── Step 2: Education ──
      case 2: return (
        <div className="space-y-6">
          {form.education.map((edu, i) => (
            <div key={i} className="card-glass p-5 relative">
              {form.education.length > 1 && (
                <button onClick={() => removeEducation(i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Degree" value={edu.degree} onChange={v => updateEducation(i, 'degree', v)} placeholder="B.S. Computer Science" />
                <InputField label="Institution" value={edu.institution} onChange={v => updateEducation(i, 'institution', v)} placeholder="MIT" />
                <InputField label="Year" value={edu.year} onChange={v => updateEducation(i, 'year', v)} placeholder="2023" />
                <InputField label="GPA (optional)" value={edu.gpa} onChange={v => updateEducation(i, 'gpa', v)} placeholder="3.8" />
              </div>
            </div>
          ))}
          <button onClick={addEducation} className="btn-outline flex items-center gap-2 text-sm">
            <Plus size={14} /> Add Education
          </button>
        </div>
      );

      // ── Step 3: Experience ──
      case 3: return (
        <div className="space-y-6">
          {form.experience.map((exp, i) => (
            <div key={i} className="card-glass p-5 relative">
              {form.experience.length > 1 && (
                <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <InputField label="Job Title" value={exp.title} onChange={v => updateExperience(i, 'title', v)} placeholder={jobRole || 'Senior Software Engineer'} />
                <InputField label="Company" value={exp.company} onChange={v => updateExperience(i, 'company', v)} placeholder="Google" />
                <InputField label="Duration" value={exp.duration} onChange={v => updateExperience(i, 'duration', v)} placeholder="Jan 2022 - Present" />
              </div>
              <TextAreaField label="Description & Achievements" value={exp.description} onChange={v => updateExperience(i, 'description', v)}
                placeholder="Led development of [product] used by [X] users. Improved [metric] by [Y%]..." rows={3} />
            </div>
          ))}
          <button onClick={addExperience} className="btn-outline flex items-center gap-2 text-sm">
            <Plus size={14} /> Add Experience
          </button>
        </div>
      );

      // ── Step 4: Skills ──
      case 4: return (
        <div className="space-y-5">
          {jobRole && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', color: '#94a3b8' }}>
              💡 Showing keyword suggestions for <span className="font-semibold ml-1" style={{ color: '#00d4ff' }}>{jobRole}</span>
            </div>
          )}
          <div className="flex gap-3">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(skillInput)}
              placeholder="Type a skill and press Enter"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(6,9,26,0.8)', border: '1px solid rgba(30,45,74,0.8)', color: '#e2e8f0' }}
            />
            <button onClick={() => addSkill(skillInput)} className="btn-primary px-4 py-2 text-sm">
              <Plus size={16} />
            </button>
          </div>

          {form.skills.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Your Skills</p>
              <div className="flex flex-wrap gap-2">
                {form.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                    style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-white"><Trash2 size={11} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
              {jobRole ? `Recommended for ${jobRole}` : 'Suggested Skills'}
            </p>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions.filter(s => !form.skills.includes(s)).map(skill => (
                <button key={skill} onClick={() => addSkill(skill)}
                  className="px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(30,45,74,0.5)', border: '1px solid rgba(30,45,74,0.8)', color: '#94a3b8' }}>
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      // ── Step 5: Projects ──
      case 5: return (
        <div className="space-y-6">
          {form.projects.map((proj, i) => (
            <div key={i} className="card-glass p-5 relative">
              {form.projects.length > 1 && (
                <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              )}
              <div className="space-y-4">
                <InputField label="Project Name" value={proj.name} onChange={v => updateProject(i, 'name', v)} placeholder="E-Commerce Platform" />
                <TextAreaField label="Description" value={proj.description} onChange={v => updateProject(i, 'description', v)}
                  placeholder="Built a [type] app serving [X] users with [key feature]..." rows={2} />
                <InputField label="Technologies Used" value={proj.tech} onChange={v => updateProject(i, 'tech', v)}
                  placeholder={jobRole && JOB_KEYWORDS[jobRole] ? JOB_KEYWORDS[jobRole].slice(0, 4).join(', ') : 'React, Node.js, PostgreSQL, Docker'} />
              </div>
            </div>
          ))}
          <button onClick={addProject} className="btn-outline flex items-center gap-2 text-sm">
            <Plus size={14} /> Add Project
          </button>
        </div>
      );

      // ── Step 6: Certifications ──
      case 6: return (
        <div className="space-y-5">
          <div className="flex gap-3">
            <input
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCert()}
              placeholder="e.g. AWS Certified Developer - 2023"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(6,9,26,0.8)', border: '1px solid rgba(30,45,74,0.8)', color: '#e2e8f0' }}
            />
            <button onClick={addCert} className="btn-primary px-4 py-2 text-sm">
              <Plus size={16} />
            </button>
          </div>
          {form.certifications.map((cert, i) => (
            <div key={i} className="flex items-center gap-3 card-glass p-4">
              <Award size={16} style={{ color: '#f59e0b' }} />
              <span className="flex-1 text-sm">{cert}</span>
              <button onClick={() => removeCert(i)} className="text-slate-500 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          ))}
          {form.certifications.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4">No certifications added yet.</p>
          )}
        </div>
      );

      default: return null;
    }
  };

  const currentStep = STEPS[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            Create <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-slate-400 mb-8">Build your professional resume step by step</p>
        </motion.div>

        {/* Step Progress */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const StepIcon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={s.id} className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive ? 'tab-active' : isDone ? 'text-green-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <StepIcon size={12} />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="w-3 h-px flex-shrink-0" style={{ background: isDone ? '#10b981' : 'rgba(30,45,74,0.8)' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-glass p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: step === 0 && domainData
                  ? `${domainData.color}25`
                  : 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))',
                border: `1px solid ${step === 0 && domainData ? domainData.color + '50' : 'rgba(0,212,255,0.3)'}`,
              }}>
              <Icon size={18} style={{ color: step === 0 && domainData ? domainData.color : '#00d4ff' }} />
            </div>
            <div>
              <h2 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{currentStep.label}</h2>
              <p className="text-xs text-slate-400">Step {step + 1} of {STEPS.length}</p>
            </div>
          </div>
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-outline flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <div className="flex items-center gap-3">
              {step === 0 && !jobRole && (
                <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-white underline">
                  Skip (auto-detect)
                </button>
              )}
              <button onClick={() => setStep(s => s + 1)} className="btn-primary flex items-center gap-2">
                Next <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={generating}
              className="btn-primary flex items-center gap-2"
            >
              {generating ? (
                <><Sparkles size={16} className="animate-spin" /> Analyzing for {jobRole || 'best match'}...</>
              ) : (
                <><Sparkles size={16} /> Analyze Resume</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
