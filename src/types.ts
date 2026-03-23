export interface ResumeSection {
  name: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface ResumeAnalysis {
  overallScore: number;
  jobRole: string;
  domain: string;
  sections: ResumeSection[];
  strengths: string[];
  weaknesses: string[];
  atsCompatibility: number;
  keywords: { found: string[]; missing: string[] };
  experienceLevel: string;
  improvementPlan: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ResumeFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    tech: string;
  }>;
  certifications: string[];
}
