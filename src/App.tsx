import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import CreateResumePage from './pages/CreateResumePage';
import AnalysisPage from './pages/AnalysisPage';
import ChatPage from './pages/ChatPage';
import type { ResumeAnalysis } from './types';

export default function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [resumeText, setResumeText] = useState('');
  const location = useLocation();

  const handleAnalysisComplete = (a: ResumeAnalysis, text: string) => {
    setAnalysis(a);
    setResumeText(text);
  };

  return (
    <div className="min-h-screen" style={{ background: '#06091a' }}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage onAnalysisComplete={handleAnalysisComplete} />} />
            <Route path="/create" element={<CreateResumePage onAnalysisComplete={handleAnalysisComplete} />} />
            <Route path="/analysis" element={
              <AnalysisPage
                analysis={analysis}
                resumeText={resumeText}
                onAnalysisUpdate={setAnalysis}
              />
            } />
            <Route path="/chat" element={<ChatPage analysis={analysis} />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
