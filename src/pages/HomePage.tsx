import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, BarChart3, MessageSquare, Sparkles, Shield, Zap, Target } from 'lucide-react';

const features = [
  { icon: Upload, title: 'Upload Resume', desc: 'Upload PDF or DOCX and get instant AI-powered analysis', color: '#00d4ff', path: '/upload' },
  { icon: FileText, title: 'Create Resume', desc: 'Build a professional resume with guided templates', color: '#7c3aed', path: '/create' },
  { icon: BarChart3, title: 'AI Score', desc: 'Get detailed section-wise scoring and ATS compatibility', color: '#10b981', path: '/analysis' },
  { icon: MessageSquare, title: 'AI Coach', desc: 'Chat with AI to get personalized improvement tips', color: '#f59e0b', path: '/chat' },
];

const stats = [
  { value: '10+', label: 'Job Domains' },
  { value: '50+', label: 'ATS Keywords' },
  { value: '6', label: 'Resume Sections' },
  { value: '100%', label: 'Free to Use' },
];

const domains = ['IT & Software', 'Data Science', 'Marketing', 'Finance', 'HR', 'Engineering', 'Design', 'Business Analysis'];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        {/* Ambient glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#00d4ff' }} />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: '#7c3aed' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
              <Sparkles size={14} />
              AI-Powered Resume Intelligence
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              AI Resume
              <br />
              <span className="gradient-text">Analyzer</span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload your resume and get instant AI analysis, ATS compatibility scores,
              section-wise feedback, and a personal AI coach to guide your career.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center"
                onClick={() => navigate('/upload')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Upload size={18} />
                Upload & Analyze Resume
              </motion.button>
              <motion.button
                className="btn-outline text-base px-8 py-4 flex items-center gap-2 justify-center"
                onClick={() => navigate('/create')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FileText size={18} />
                Create New Resume
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-glass p-6 text-center"
            >
              <div className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Everything You Need</h2>
            <p className="text-slate-400">Four powerful tools to land your dream job</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="card-glass p-6 cursor-pointer group hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate(f.path)}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                  <div className="mt-4 text-xs font-medium" style={{ color: f.color }}>Get Started →</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="card-glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target size={22} style={{ color: '#00d4ff' }} />
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Supported Domains</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {domains.map(d => (
                <span key={d} className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-2xl p-10 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#7c3aed' }} />
            <Zap size={40} className="mx-auto mb-4" style={{ color: '#00d4ff' }} />
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Ready to Level Up Your Resume?</h2>
            <p className="text-slate-400 mb-8">Join thousands of job seekers who improved their resume score with AI</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center gap-2 justify-center" onClick={() => navigate('/upload')}>
                <Upload size={16} /> Analyze My Resume
              </button>
              <button className="btn-outline flex items-center gap-2 justify-center" onClick={() => navigate('/chat')}>
                <MessageSquare size={16} /> Chat with AI Coach
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Privacy First', desc: 'Your resume data is never stored or shared' },
            { icon: Zap, title: 'Instant Analysis', desc: 'Get results in seconds, not minutes' },
            { icon: Sparkles, title: 'AI-Powered', desc: 'Advanced NLP and keyword matching technology' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 card-glass p-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,212,255,0.1)' }}>
                <Icon size={18} style={{ color: '#00d4ff' }} />
              </div>
              <div>
                <div className="font-semibold mb-1">{title}</div>
                <div className="text-sm text-slate-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
