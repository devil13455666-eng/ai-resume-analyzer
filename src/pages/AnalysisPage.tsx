import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, CheckCircle, XCircle, Tag, Zap, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, RefreshCw, Bot } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import DomainSelector from '../components/DomainSelector';
import { analyzeResumeText, DOMAIN_ROLES, getAIAnalysis } from '../lib/resumeAnalyzer';
import type { ResumeAnalysis } from '../types';

interface AnalysisPageProps {
  analysis: ResumeAnalysis | null;
  resumeText?: string;
  onAnalysisUpdate?: (a: ResumeAnalysis) => void;
}

function SectionCard({ section, index }: { section: { name: string; score: number; feedback: string; suggestions: string[] }; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200 + index * 100);
    return () => clearTimeout(t);
  }, [index]);

  const getColor = (s: number) => s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-glass p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">{section.name}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold" style={{ color: getColor(section.score), fontFamily: 'Syne, sans-serif' }}>
            {section.score}
          </span>
          <button onClick={() => setExpanded(!expanded)} className="text-slate-400 hover:text-white">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Score bar */}
      <div className="h-2 rounded-full mb-3" style={{ background: 'rgba(30,45,74,0.8)' }}>
        <div
          className="h-2 rounded-full transition-all duration-1000"
          style={{
            width: animated ? `${section.score}%` : '0%',
            background: `linear-gradient(90deg, ${getColor(section.score)}, ${getColor(section.score)}88)`,
            boxShadow: `0 0 8px ${getColor(section.score)}60`,
          }}
        />
      </div>

      <p className="text-sm text-slate-400">{section.feedback}</p>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(30,45,74,0.8)' }}
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Suggestions</p>
          <ul className="space-y-1">
            {section.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span style={{ color: '#00d4ff' }} className="mt-0.5">→</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function AnalysisPage({ analysis, resumeText = '', onAnalysisUpdate }: AnalysisPageProps) {
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [isGeneratingDeep, setIsGeneratingDeep] = useState(false);
  const [deepAnalysisResult, setDeepAnalysisResult] = useState<string | null>(null);
  const [deepAnalysisError, setDeepAnalysisError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDeepAnalysis = async () => {
    if (!resumeText || !analysis) return;
    setIsGeneratingDeep(true);
    setDeepAnalysisError(null);
    try {
      const result = await getAIAnalysis(resumeText, analysis.jobRole);
      setDeepAnalysisResult(result);
    } catch (err: any) {
      setDeepAnalysisError("Make sure VITE_GROQ_API_KEY is properly configured in your .env file. " + err.message);
    } finally {
      setIsGeneratingDeep(false);
    }
  };

  const getDomainData = (role: string) => {
    for (const [, data] of Object.entries(DOMAIN_ROLES)) {
      if (data.roles.includes(role)) return data;
    }
    return null;
  };

  const handleRoleSwitch = async (newRole: string) => {
    if (!newRole || !resumeText || !onAnalysisUpdate) return;
    setSwitching(true);
    setShowRoleSwitch(false);
    await new Promise(r => setTimeout(r, 1200));
    const newAnalysis = analyzeResumeText(resumeText, newRole);
    onAnalysisUpdate(newAnalysis);
    setSwitching(false);
  };

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
            <BarChart3 size={32} style={{ color: '#00d4ff' }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>No Analysis Yet</h2>
          <p className="text-slate-400 mb-8">Upload your resume or create one to see your AI score</p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary" onClick={() => navigate('/upload')}>Upload Resume</button>
            <button className="btn-outline" onClick={() => navigate('/create')}>Create Resume</button>
          </div>
        </div>
      </div>
    );
  }

  const { overallScore, jobRole, domain, sections, strengths, weaknesses, atsCompatibility, keywords, experienceLevel, improvementPlan } = analysis;
  const domainData = getDomainData(jobRole);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            AI Resume <span className="gradient-text">Score</span>
          </h1>
          {/* Domain/Role badge + switch button */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: domainData ? `${domainData.color}15` : 'rgba(0,212,255,0.1)',
                border: `1px solid ${domainData ? domainData.color + '40' : 'rgba(0,212,255,0.3)'}`,
                color: domainData?.color ?? '#00d4ff',
              }}
            >
              <span>{domainData?.icon ?? '🎯'}</span>
              <span className="font-semibold">{jobRole}</span>
              <span className="text-xs opacity-60">• {domain}</span>
            </div>

            {onAnalysisUpdate && resumeText && (
              <button
                onClick={() => setShowRoleSwitch(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(30,45,74,0.6)', border: '1px solid rgba(30,45,74,0.8)', color: '#94a3b8' }}
              >
                <RefreshCw size={12} />
                Re-analyze for different role
              </button>
            )}

            {switching && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <RefreshCw size={14} className="animate-spin" style={{ color: '#00d4ff' }} />
                Re-analyzing...
              </div>
            )}
          </div>

          {/* Role switcher panel */}
          <AnimatePresence>
            {showRoleSwitch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <DomainSelector
                  value={jobRole}
                  onChange={handleRoleSwitch}
                  onClose={() => setShowRoleSwitch(false)}
                  inline
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Overall Score + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-glass p-8 flex flex-col items-center justify-center lg:col-span-1"
          >
            <p className="text-sm text-slate-400 uppercase tracking-wider mb-4">Overall Score</p>
            <ScoreRing score={overallScore} size={180} strokeWidth={14} />
            <div className="mt-4 text-center">
              <div className="text-sm font-medium" style={{ color: '#00d4ff' }}>{experienceLevel} Level</div>
              <div className="text-xs text-slate-400 mt-1">{jobRole}</div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: 'ATS Compatibility', value: `${atsCompatibility}%`, color: atsCompatibility >= 70 ? '#10b981' : '#f59e0b', icon: Zap },
              { label: 'Keywords Found', value: `${keywords.found.length}/${keywords.found.length + keywords.missing.length}`, color: '#00d4ff', icon: Tag },
              { label: 'Strengths', value: strengths.length.toString(), color: '#10b981', icon: TrendingUp },
              { label: 'Areas to Improve', value: weaknesses.length.toString(), color: '#f59e0b', icon: AlertTriangle },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="card-glass p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} style={{ color: stat.color }} />
                    <span className="text-xs text-slate-400">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold" style={{ color: stat.color, fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section Scores */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Section-wise Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, i) => (
              <SectionCard key={section.name} section={section} index={i} />
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={18} style={{ color: '#10b981' }} />
              <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Strengths</h3>
            </div>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span className="text-slate-300">{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">Add more content to identify strengths</p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={18} style={{ color: '#ef4444' }} />
              <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Areas to Improve</h3>
            </div>
            {weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span className="text-slate-300">{w}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">Great job — no major weaknesses found!</p>
            )}
          </motion.div>
        </div>

        {/* Keywords */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Tag size={18} style={{ color: '#00d4ff' }} />
            <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Keyword Analysis</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Found Keywords ✓</p>
              <div className="flex flex-wrap gap-2">
                {keywords.found.map(k => (
                  <span key={k} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Missing Keywords ✗</p>
              <div className="flex flex-wrap gap-2">
                {keywords.missing.map(k => (
                  <span key={k} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Improvement Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} style={{ color: '#7c3aed' }} />
            <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>AI Improvement Plan</h3>
          </div>
          <div className="space-y-3">
            {improvementPlan.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #00d4ff20, #7c3aed20)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
                  {i + 1}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed pt-0.5">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deep AI Analysis (Groq) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Bot size={18} style={{ color: '#ec4899' }} />
              <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Deep Integration Analysis (Groq AI)</h3>
            </div>
            {!deepAnalysisResult && (
              <button 
                onClick={handleDeepAnalysis} 
                className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
                disabled={isGeneratingDeep}
                style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
              >
                {isGeneratingDeep ? <RefreshCw size={14} className="animate-spin" /> : <Bot size={14} />}
                {isGeneratingDeep ? 'Analyzing...' : 'Generate Deep Analysis'}
              </button>
            )}
          </div>
          
          {deepAnalysisError && (
            <div className="p-4 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
              <AlertTriangle size={16} className="inline mr-2" />
              {deepAnalysisError}
            </div>
          )}

          {deepAnalysisResult && (
            <div className="p-5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap" style={{ background: 'rgba(30,45,74,0.4)', border: '1px solid rgba(30,45,74,0.8)' }}>
              {deepAnalysisResult}
            </div>
          )}
          {!deepAnalysisResult && !deepAnalysisError && (
             <p className="text-sm text-slate-400">Unlock a real-time, deep ATS evaluation powered by Groq's Llama 3 model.</p>
          )}
        </motion.div>

        {/* CTA to Chat */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="rounded-2xl p-6 text-center"
           style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))', border: '1px solid rgba(0,212,255,0.2)' }}
        >
          <p className="text-slate-300 mb-4">Want personalized advice? Chat with your AI Resume Coach!</p>
          <button className="btn-primary" onClick={() => navigate('/chat')}>💬 Open AI Coach</button>
        </motion.div>
      </div>
    </div>
  );
}
