import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { analyzeResumeText, DOMAIN_ROLES } from '../lib/resumeAnalyzer';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
import DomainSelector from '../components/DomainSelector';
import type { ResumeAnalysis } from '../types';

interface UploadPageProps {
  onAnalysisComplete: (analysis: ResumeAnalysis, text: string) => void;
}

export default function UploadPage({ onAnalysisComplete }: UploadPageProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [step, setStep] = useState<'role' | 'upload' | 'preview' | 'done'>('role');
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  // Find domain color for selected role
  const getDomainData = (role: string) => {
    for (const [, data] of Object.entries(DOMAIN_ROLES)) {
      if (data.roles.includes(role)) return data;
    }
    return null;
  };
  const domainData = jobRole ? getDomainData(jobRole) : null;

  const extractText = async (f: File): Promise<string> => {
    const ext = f.name.split('.').pop()?.toLowerCase();

    if (ext === 'txt') {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.onerror = () => resolve('');
        reader.readAsText(f);
      });
    }

    if (ext === 'docx') {
      try {
        const arrayBuffer = await f.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value || '';
      } catch (err) {
        console.error('DOCX extraction error:', err);
        return '';
      }
    }

    if (ext === 'pdf') {
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          fullText += strings.join(' ') + '\n';
        }
        return fullText.trim();
      } catch (err) {
        console.error('PDF extraction error:', err);
        return '';
      }
    }

    return '';
  };

  const handleFile = useCallback(async (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'txt'].includes(ext || '')) {
      setError('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    if (f.size === 0) {
      setError('Please enter appropriate file and blank file not allowed');
      return;
    }

    setError('');
    setFile(f);
    
    try {
      const text = await extractText(f);

      if (!text || text.trim().length === 0) {
        setError('Could not extract text from this file. It might be empty or scanned.');
        setFile(null);
        return;
      }

      // Basic check for resume-like content - more inclusive keywords
      const resumeKeywords = ['experience', 'education', 'skills', 'projects', 'summary', 'work', 'university', 'college', 'employment', 'background', 'achievement', 'certif'];
      const hasResumeContent = resumeKeywords.some(kw => text.toLowerCase().includes(kw));

      if (text.trim().length < 50 || !hasResumeContent) {
        setError('Please enter appropriate file and blank file not allowed');
        setFile(null);
        setExtractedText('');
        return;
      }

      setExtractedText(text);
      setStep('preview');
    } catch (err) {
      console.error('File processing error:', err);
      setError('Error reading file. Please try a different format.');
      setFile(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!extractedText) return;
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    const analysis = analyzeResumeText(extractedText, jobRole || undefined);
    setAnalyzing(false);
    setStep('done');
    onAnalysisComplete(analysis, extractedText);
    navigate('/analysis');
  };

  const reset = () => {
    setFile(null);
    setExtractedText('');
    setStep('role');
    setError('');
    setJobRole('');

  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            Upload <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-slate-400 mb-8">Choose your target role first, then upload your resume for tailored AI analysis</p>
        </motion.div>

        {/* Progress steps */}
        <div className="flex items-center gap-3 mb-8">
          {[
            { id: 'role', label: 'Target Role' },
            { id: 'upload', label: 'Upload' },
            { id: 'preview', label: 'Review' },
            { id: 'done', label: 'Done' },
          ].map((s, i, arr) => {
            const stepOrder = ['role', 'upload', 'preview', 'done'];
            const currentIdx = stepOrder.indexOf(step);
            const thisIdx = stepOrder.indexOf(s.id);
            const isDone = thisIdx < currentIdx;
            const isActive = thisIdx === currentIdx;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      background: isDone ? '#10b981' : isActive ? 'linear-gradient(135deg, #00d4ff, #7c3aed)' : 'rgba(30,45,74,0.8)',
                      color: isDone || isActive ? 'white' : '#64748b',
                    }}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-white' : isDone ? 'text-green-400' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-8 h-px" style={{ background: isDone ? '#10b981' : 'rgba(30,45,74,0.8)' }} />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Choose Role ── */}
          {step === 'role' && (
            <motion.div key="role" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <DomainSelector
                value={jobRole}
                onChange={setJobRole}
                inline
              />

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {jobRole
                    ? <span>✅ Selected: <span className="text-white font-medium">{jobRole}</span></span>
                    : <span className="text-yellow-400/80">⚠ Select a role for accurate scoring, or skip for auto-detection</span>
                  }
                </p>
                <div className="flex gap-3">
                  {!jobRole && (
                    <button
                      onClick={() => setStep('upload')}
                      className="btn-outline text-sm px-4 py-2"
                    >
                      Skip (Auto-detect)
                    </button>
                  )}
                  <button
                    onClick={() => setStep('upload')}
                    className="btn-primary text-sm px-5 py-2 flex items-center gap-2"
                  >
                    Continue <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Upload ── */}
          {step === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              {/* Selected role badge */}
              {jobRole && domainData && (
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{ background: `${domainData.color}12`, border: `1px solid ${domainData.color}35` }}
                >
                  <span className="text-2xl">{domainData.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: domainData.color }}>{jobRole}</p>
                    <p className="text-xs text-slate-400">Resume will be scored for this role's requirements</p>
                  </div>
                  <button
                    onClick={() => setStep('role')}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Upload Zone */}
              <div
                className={`upload-zone p-16 text-center cursor-pointer ${dragOver ? 'drag-over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Upload size={36} style={{ color: '#00d4ff' }} />
                </motion.div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Drop your resume here</h3>
                <p className="text-slate-400 mb-4">or click to browse files</p>
                <div className="flex justify-center gap-3">
                  {['PDF', 'DOCX', 'TXT'].map(fmt => (
                    <span key={fmt} className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />{error}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => setStep('role')} className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
                  ← Back
                </button>
                <div className="card-glass px-4 py-2.5 flex items-start gap-2">
                  <AlertCircle size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400">
                    <span className="text-yellow-400 font-medium">Demo:</span> Upload <span className="text-white">.txt</span> for real analysis. PDF/DOCX use sample data.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Preview ── */}
          {step === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              {/* Role + File info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Role card */}
                <div
                  className="p-4 rounded-xl flex items-center gap-3"
                  style={{
                    background: domainData ? `${domainData.color}12` : 'rgba(0,212,255,0.08)',
                    border: `1px solid ${domainData ? domainData.color + '35' : 'rgba(0,212,255,0.2)'}`,
                  }}
                >
                  <span className="text-2xl">{domainData?.icon ?? '🎯'}</span>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Scoring for</p>
                    <p className="font-semibold text-sm" style={{ color: domainData?.color ?? '#00d4ff' }}>
                      {jobRole || 'Auto-detect'}
                    </p>
                  </div>
                  <button onClick={() => setStep('role')} className="ml-auto text-xs text-slate-500 hover:text-white underline">
                    Change
                  </button>
                </div>

                {/* File card */}
                <div className="card-glass p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,212,255,0.1)' }}>
                    <FileText size={18} style={{ color: '#00d4ff' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{file?.name}</div>
                    <div className="text-xs text-slate-400">{file ? (file.size / 1024).toFixed(1) + ' KB' : ''}</div>
                  </div>
                  <button onClick={() => setStep('upload')} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Text Preview */}
              <div className="card-glass p-5 mb-6">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Extracted Content Preview</p>
                <div className="text-sm text-slate-300 leading-relaxed max-h-44 overflow-y-auto" style={{ fontFamily: 'monospace' }}>
                  {extractedText.substring(0, 500)}...
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep('upload')} className="btn-outline flex items-center gap-2 text-sm">
                  ← Back
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="btn-primary flex items-center gap-2 flex-1 justify-center"
                >
                  {analyzing ? (
                    <><Loader2 size={16} className="animate-spin" /> Analyzing for {jobRole || 'best match'}...</>
                  ) : (
                    <><Sparkles size={16} /> Analyze Resume</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Done ── */}
          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="card-glass p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981' }}
                >
                  <CheckCircle size={36} style={{ color: '#10b981' }} />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Analysis Complete!</h2>
                <p className="text-slate-400 mb-2">
                  Scored as: <span className="text-white font-semibold">{jobRole || 'Auto-detected role'}</span>
                </p>
                <p className="text-slate-400 mb-8">View your detailed results in the AI Score tab.</p>
                <button onClick={reset} className="btn-outline">Analyze Another Resume</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
