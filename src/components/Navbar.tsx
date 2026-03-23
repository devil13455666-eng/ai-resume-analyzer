import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brain, FileText, Upload, BarChart3, MessageSquare, Menu, X } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Brain, path: '/' },
  { id: 'upload', label: 'Upload Resume', icon: Upload, path: '/upload' },
  { id: 'create', label: 'Create Resume', icon: FileText, path: '/create' },
  { id: 'analysis', label: 'AI Score', icon: BarChart3, path: '/analysis' },
  { id: 'chat', label: 'AI Coach', icon: MessageSquare, path: '/chat' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const tab = tabs.find(t => t.path === currentPath);
    return tab ? tab.id : 'home';
  };

  const activeTab = getActiveTab();

  return (
    <nav className="sticky top-0 z-50" style={{ background: 'rgba(6,9,26,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(30,45,74,0.8)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-display font-800 text-lg" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              <span className="gradient-text">AI Resume</span>
              <span className="text-white"> Analyzer</span>
            </span>
          </motion.div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'tab-active' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={15} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pb-4 border-t"
          style={{ borderColor: 'rgba(30,45,74,0.8)' }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { navigate(tab.path); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium mt-1 ${
                  isActive ? 'tab-active' : 'text-slate-400'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
