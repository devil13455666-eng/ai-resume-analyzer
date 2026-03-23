import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateChatResponse } from '../lib/resumeAnalyzer';
import type { ChatMessage, ResumeAnalysis } from '../types';

interface ChatPageProps {
  analysis: ResumeAnalysis | null;
}

const QUICK_PROMPTS = [
  'Why did I get this score?',
  'How can I improve my skills section?',
  'What are my resume strengths?',
  'How to improve ATS compatibility?',
  'What certifications should I get?',
  'How to improve work experience?',
  'What keywords am I missing?',
  'Give me an improvement plan',
  'Generate verification questions',
  'Confirm my skills for this role',
];

function formatMessage(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    // Bold text
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const formatted = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
    );
    return <p key={i} className={`${line === '' ? 'h-2' : ''} leading-relaxed`}>{formatted}</p>;
  });
}

export default function ChatPage({ analysis }: ChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: analysis
        ? `👋 Hello! I'm your AI Resume Coach. I've analyzed your resume for a **${analysis.jobRole}** position and your score is **${analysis.overallScore}/100**.\n\nI can help you:\n• 📊 Understand your score breakdown\n• 🛠️ Improve specific sections\n• 🤖 Boost ATS compatibility\n• 🏆 Get certification recommendations\n• 🚀 Create an improvement plan\n\nWhat would you like to work on first?`
        : `👋 Hello! I'm your AI Resume Coach. I'm ready to help you create an amazing resume!\n\nTo get started, please **upload your resume** or **create one** using the tabs above. Once analyzed, I can provide personalized advice on:\n• Your resume score and why\n• Missing keywords and skills\n• Section-wise improvements\n• ATS optimization tips\n\nWhat can I help you with today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 800 + Math.random() * 800));

    const response = generateChatResponse(text, analysis, messages);
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: analysis
        ? `Chat cleared! I'm still here to help with your ${analysis.jobRole} resume. What would you like to know?`
        : `Chat cleared! Upload a resume to get personalized advice.`,
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                AI <span className="gradient-text">Coach</span>
              </h1>
              <p className="text-slate-400 mt-1">
                {analysis
                  ? `Personalized coaching for ${analysis.jobRole} • Score: ${analysis.overallScore}/100`
                  : 'Upload a resume to get personalized coaching'}
              </p>
            </div>
            <button
              onClick={clearChat}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Clear chat"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="card-glass overflow-hidden" style={{ height: '65vh', display: 'flex', flexDirection: 'column' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'assistant' ? 'pulse-glow' : ''
                    }`}
                    style={{
                      background: msg.role === 'assistant'
                        ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
                        : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                    }}
                  >
                    {msg.role === 'assistant' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user' ? 'chat-bubble-user text-white' : 'chat-bubble-ai text-slate-300'
                    }`}
                  >
                    {formatMessage(msg.content)}
                    <div className="text-xs mt-2 opacity-40">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
                  <Bot size={14} className="text-white" />
                </div>
                <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1">
                  <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#00d4ff' }} />
                  <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#00d4ff' }} />
                  <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#00d4ff' }} />
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4" style={{ borderTop: '1px solid rgba(30,45,74,0.8)' }}>
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your resume score, skills, ATS, certifications..."
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(6,9,26,0.8)',
                  border: '1px solid rgba(30,45,74,0.8)',
                  color: '#e2e8f0',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(30,45,74,0.8)'; }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #00d4ff, #7c3aed)' : 'rgba(30,45,74,0.5)',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={16} className="text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} style={{ color: '#00d4ff' }} />
            <span className="text-xs text-slate-400 uppercase tracking-wider">Quick Questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: '#94a3b8',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00d4ff'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#94a3b8'; }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* No analysis CTA */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 card-glass p-5 flex items-center gap-4"
          >
            <MessageSquare size={20} style={{ color: '#f59e0b' }} />
            <div className="flex-1">
              <p className="text-sm font-medium">Get personalized advice</p>
              <p className="text-xs text-slate-400">Upload or create a resume first for AI-powered coaching</p>
            </div>
            <button className="btn-primary text-sm px-4 py-2" onClick={() => navigate('/upload')}>Upload Now</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
