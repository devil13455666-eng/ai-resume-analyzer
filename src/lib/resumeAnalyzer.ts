import type { ResumeAnalysis, ResumeFormData } from '../types';

// ─── Expanded Job Role → Keywords map ────────────────────────────────────────
export const JOB_KEYWORDS: Record<string, string[]> = {
  // ── Web & Frontend ──
  'Web Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'responsive design', 'REST API', 'Git', 'Tailwind', 'webpack', 'performance optimization', 'cross-browser'],
  'Frontend Developer': ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Figma', 'accessibility', 'performance', 'webpack', 'testing'],
  'Full Stack Developer': ['React', 'Node.js', 'JavaScript', 'TypeScript', 'SQL', 'REST API', 'Docker', 'Git', 'MongoDB', 'PostgreSQL', 'CI/CD', 'AWS'],
  'Backend Developer': ['Node.js', 'Python', 'Java', 'REST API', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker', 'microservices', 'authentication', 'caching', 'message queues'],

  // ── Mobile ──
  'Android Developer': ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'MVVM', 'Room', 'Retrofit', 'Firebase', 'Play Store', 'Gradle', 'unit testing', 'Material Design'],
  'iOS Developer': ['Swift', 'Objective-C', 'Xcode', 'SwiftUI', 'UIKit', 'Core Data', 'Combine', 'App Store', 'CocoaPods', 'REST API', 'MVVM', 'TestFlight'],
  'React Native Developer': ['React Native', 'JavaScript', 'TypeScript', 'Expo', 'Redux', 'REST API', 'Firebase', 'navigation', 'iOS', 'Android', 'performance', 'testing'],
  'Flutter Developer': ['Flutter', 'Dart', 'BLoC', 'Provider', 'Firebase', 'REST API', 'Material Design', 'iOS', 'Android', 'state management', 'animations', 'testing'],

  // ── Data & AI ──
  'Data Scientist': ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL', 'Statistics', 'Deep Learning', 'scikit-learn', 'R', 'Tableau', 'data visualization'],
  'Data Analyst': ['SQL', 'Excel', 'Python', 'Tableau', 'Power BI', 'data cleaning', 'statistics', 'Google Analytics', 'dashboards', 'ETL', 'A/B testing', 'reporting'],
  'Machine Learning Engineer': ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'MLOps', 'Docker', 'AWS', 'feature engineering', 'model deployment', 'NLP', 'computer vision', 'Kubernetes'],
  'AI Engineer': ['Python', 'LLM', 'OpenAI API', 'LangChain', 'RAG', 'NLP', 'PyTorch', 'TensorFlow', 'prompt engineering', 'vector databases', 'fine-tuning', 'embeddings'],
  'Data Engineer': ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Airflow', 'ETL', 'AWS', 'BigQuery', 'dbt', 'data pipelines', 'Hadoop', 'Snowflake'],

  // ── DevOps & Cloud ──
  'DevOps Engineer': ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'AWS', 'Terraform', 'Linux', 'monitoring', 'automation', 'Git', 'microservices', 'Ansible'],
  'Cloud Engineer': ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'networking', 'IAM', 'serverless', 'cost optimization', 'infrastructure', 'monitoring'],
  'Site Reliability Engineer': ['SRE', 'Linux', 'Kubernetes', 'monitoring', 'alerting', 'incident response', 'Python', 'Go', 'SLI/SLO', 'capacity planning', 'automation', 'Prometheus'],
  'Cybersecurity Analyst': ['penetration testing', 'SIEM', 'firewall', 'vulnerability assessment', 'network security', 'OWASP', 'incident response', 'encryption', 'SOC', 'compliance', 'threat analysis', 'Python'],

  // ── Software Engineering ──
  'Software Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'REST API', 'TypeScript', 'Docker', 'AWS', 'algorithms', 'data structures'],
  'Java Developer': ['Java', 'Spring Boot', 'Hibernate', 'Maven', 'REST API', 'SQL', 'Microservices', 'JUnit', 'Docker', 'Git', 'design patterns', 'multithreading'],
  'Python Developer': ['Python', 'Django', 'Flask', 'FastAPI', 'SQL', 'REST API', 'Docker', 'Git', 'Celery', 'PostgreSQL', 'testing', 'AWS'],
  'QA Engineer': ['test automation', 'Selenium', 'Cypress', 'Jest', 'API testing', 'manual testing', 'bug tracking', 'Jira', 'test plans', 'regression testing', 'CI/CD', 'performance testing'],
  'Blockchain Developer': ['Solidity', 'Ethereum', 'Web3.js', 'smart contracts', 'DeFi', 'NFT', 'Hardhat', 'Truffle', 'IPFS', 'cryptography', 'consensus algorithms', 'Rust'],

  // ── Design ──
  'UX Designer': ['Figma', 'wireframing', 'prototyping', 'user research', 'usability testing', 'design systems', 'Adobe XD', 'interaction design', 'accessibility', 'information architecture', 'user flows', 'personas'],
  'UI Designer': ['Figma', 'Adobe XD', 'Sketch', 'design systems', 'typography', 'color theory', 'responsive design', 'prototyping', 'component libraries', 'CSS', 'brand guidelines', 'animations'],
  'Graphic Designer': ['Adobe Photoshop', 'Illustrator', 'InDesign', 'typography', 'branding', 'logo design', 'print design', 'color theory', 'layout', 'creative direction', 'vector graphics', 'Figma'],
  'Motion Designer': ['After Effects', 'Cinema 4D', 'animation', 'motion graphics', 'video editing', 'Premiere Pro', 'storyboarding', 'visual effects', 'typography', 'compositing', '3D modeling', 'Blender'],
  'Product Designer': ['Figma', 'user research', 'prototyping', 'design systems', 'usability testing', 'cross-functional', 'product strategy', 'wireframing', 'interaction design', 'A/B testing', 'metrics', 'accessibility'],

  // ── Product & Management ──
  'Product Manager': ['roadmap', 'stakeholder', 'agile', 'scrum', 'KPI', 'user research', 'product strategy', 'A/B testing', 'analytics', 'prioritization', 'go-to-market', 'OKR'],
  'Project Manager': ['PMP', 'agile', 'scrum', 'stakeholder management', 'risk management', 'budgeting', 'Jira', 'MS Project', 'resource planning', 'milestones', 'communication', 'change management'],
  'Business Analyst': ['requirements gathering', 'process improvement', 'BPMN', 'SQL', 'stakeholder management', 'Jira', 'documentation', 'data analysis', 'Agile', 'user stories', 'gap analysis', 'Visio'],
  'Scrum Master': ['Scrum', 'Agile', 'sprint planning', 'retrospectives', 'Jira', 'Kanban', 'impediment removal', 'SAFe', 'velocity', 'burndown charts', 'coaching', 'facilitation'],

  // ── Marketing ──
  'Marketing Manager': ['SEO', 'SEM', 'Google Analytics', 'content marketing', 'social media', 'campaigns', 'brand strategy', 'lead generation', 'CRM', 'ROI', 'email marketing', 'HubSpot'],
  'Digital Marketing Specialist': ['SEO', 'Google Ads', 'Facebook Ads', 'email marketing', 'Google Analytics', 'content strategy', 'social media', 'conversion rate optimization', 'PPC', 'A/B testing', 'HubSpot', 'copywriting'],
  'SEO Specialist': ['SEO', 'keyword research', 'on-page optimization', 'link building', 'Google Search Console', 'Ahrefs', 'SEMrush', 'technical SEO', 'content strategy', 'analytics', 'backlinks', 'SERP'],
  'Content Writer': ['SEO writing', 'copywriting', 'content strategy', 'blogging', 'editorial calendar', 'WordPress', 'research', 'storytelling', 'social media', 'proofreading', 'brand voice', 'long-form content'],
  'Social Media Manager': ['Instagram', 'LinkedIn', 'Twitter', 'Facebook', 'content creation', 'community management', 'analytics', 'paid social', 'influencer marketing', 'brand strategy', 'scheduling tools', 'engagement'],

  // ── Finance ──
  'Financial Analyst': ['Excel', 'financial modeling', 'forecasting', 'budgeting', 'valuation', 'SQL', 'Power BI', 'SAP', 'accounting', 'risk analysis', 'DCF', 'variance analysis'],
  'Accountant': ['GAAP', 'Excel', 'QuickBooks', 'tax preparation', 'financial statements', 'accounts payable', 'accounts receivable', 'auditing', 'reconciliation', 'budgeting', 'SAP', 'payroll'],
  'Investment Banker': ['financial modeling', 'DCF', 'M&A', 'capital markets', 'valuation', 'Excel', 'pitch decks', 'due diligence', 'LBO', 'Bloomberg', 'deal execution', 'client management'],
  'Risk Analyst': ['risk assessment', 'financial modeling', 'Excel', 'SQL', 'VaR', 'regulatory compliance', 'stress testing', 'credit risk', 'market risk', 'operational risk', 'Basel', 'Python'],

  // ── HR ──
  'HR Manager': ['recruitment', 'talent acquisition', 'HRIS', 'employee relations', 'onboarding', 'performance management', 'compliance', 'payroll', 'training', 'benefits administration', 'culture', 'labor law'],
  'Recruiter': ['talent acquisition', 'sourcing', 'LinkedIn Recruiter', 'ATS', 'interviewing', 'offer negotiation', 'Boolean search', 'employer branding', 'candidate experience', 'pipeline management', 'JD writing', 'headhunting'],
  'HR Business Partner': ['strategic HR', 'organizational development', 'change management', 'talent management', 'workforce planning', 'employee engagement', 'performance management', 'coaching', 'succession planning', 'HRIS', 'analytics', 'compliance'],

  // ── Engineering ──
  'Mechanical Engineer': ['CAD', 'SolidWorks', 'AutoCAD', 'FEA', 'MATLAB', 'manufacturing', 'thermodynamics', 'fluid mechanics', 'GD&T', 'ANSYS', 'prototyping', 'product design'],
  'Electrical Engineer': ['circuit design', 'PCB', 'MATLAB', 'Simulink', 'embedded systems', 'power systems', 'VHDL', 'signal processing', 'AutoCAD Electrical', 'PLC', 'microcontrollers', 'testing'],
  'Civil Engineer': ['AutoCAD', 'structural analysis', 'project management', 'construction', 'STAAD Pro', 'surveying', 'soil mechanics', 'hydrology', 'Revit', 'BIM', 'cost estimation', 'site supervision'],
  'Embedded Systems Engineer': ['C', 'C++', 'RTOS', 'microcontrollers', 'ARM', 'UART', 'SPI', 'I2C', 'firmware', 'debugging', 'oscilloscope', 'PCB design'],

  // ── Sales & Customer Success ──
  'Sales Manager': ['B2B sales', 'CRM', 'Salesforce', 'pipeline management', 'quota attainment', 'negotiation', 'cold calling', 'account management', 'revenue growth', 'forecasting', 'team leadership', 'client retention'],
  'Customer Success Manager': ['customer onboarding', 'churn reduction', 'NPS', 'CRM', 'account management', 'upselling', 'SaaS', 'Salesforce', 'customer health scores', 'QBR', 'stakeholder management', 'retention'],
};

// ─── Domain → Roles mapping ───────────────────────────────────────────────────
export const DOMAIN_ROLES: Record<string, { roles: string[]; icon: string; color: string; description: string }> = {
  'Web Development': {
    roles: ['Web Developer', 'Frontend Developer', 'Full Stack Developer', 'Backend Developer'],
    icon: '🌐',
    color: '#00d4ff',
    description: 'HTML, CSS, JS, React, Node.js & more',
  },
  'Mobile Development': {
    roles: ['Android Developer', 'iOS Developer', 'React Native Developer', 'Flutter Developer'],
    icon: '📱',
    color: '#7c3aed',
    description: 'Android, iOS, React Native, Flutter',
  },
  'Data & Analytics': {
    roles: ['Data Scientist', 'Data Analyst', 'Data Engineer', 'Machine Learning Engineer', 'AI Engineer'],
    icon: '📊',
    color: '#10b981',
    description: 'Python, SQL, ML, AI, Data pipelines',
  },
  'DevOps & Cloud': {
    roles: ['DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer', 'Cybersecurity Analyst'],
    icon: '☁️',
    color: '#f59e0b',
    description: 'Docker, Kubernetes, AWS, CI/CD',
  },
  'Software Engineering': {
    roles: ['Software Engineer', 'Java Developer', 'Python Developer', 'QA Engineer', 'Blockchain Developer'],
    icon: '💻',
    color: '#06b6d4',
    description: 'Java, Python, testing, algorithms',
  },
  'Design': {
    roles: ['UX Designer', 'UI Designer', 'Graphic Designer', 'Motion Designer', 'Product Designer'],
    icon: '🎨',
    color: '#ec4899',
    description: 'Figma, Adobe Suite, UX research',
  },
  'Product & Management': {
    roles: ['Product Manager', 'Project Manager', 'Business Analyst', 'Scrum Master'],
    icon: '🗂️',
    color: '#8b5cf6',
    description: 'Roadmaps, Agile, stakeholders, OKRs',
  },
  'Marketing': {
    roles: ['Marketing Manager', 'Digital Marketing Specialist', 'SEO Specialist', 'Content Writer', 'Social Media Manager'],
    icon: '📣',
    color: '#f97316',
    description: 'SEO, ads, content, social media',
  },
  'Finance': {
    roles: ['Financial Analyst', 'Accountant', 'Investment Banker', 'Risk Analyst'],
    icon: '💰',
    color: '#22c55e',
    description: 'Modeling, accounting, valuation',
  },
  'Human Resources': {
    roles: ['HR Manager', 'Recruiter', 'HR Business Partner'],
    icon: '🤝',
    color: '#a78bfa',
    description: 'Talent, culture, compliance',
  },
  'Engineering': {
    roles: ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Embedded Systems Engineer'],
    icon: '⚙️',
    color: '#64748b',
    description: 'CAD, circuits, manufacturing, systems',
  },
  'Sales & Customer Success': {
    roles: ['Sales Manager', 'Customer Success Manager'],
    icon: '🎯',
    color: '#ef4444',
    description: 'B2B, CRM, revenue, retention',
  },
};

export const JOB_ROLES = Object.keys(JOB_KEYWORDS);
export const DOMAINS = Object.keys(DOMAIN_ROLES);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getDomainForRole(role: string): string {
  for (const [domain, data] of Object.entries(DOMAIN_ROLES)) {
    if (data.roles.includes(role)) return domain;
  }
  return 'Software Engineering';
}

function scoreText(text: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  if (text.length < 200) { score -= 20; issues.push('Resume content is too brief'); }
  if (text.length < 500) { score -= 10; issues.push('Consider adding more detail'); }
  if (!/\d/.test(text)) { score -= 15; issues.push('No quantified achievements found'); }
  if (!/[A-Z]/.test(text.substring(0, 50))) { score -= 5; issues.push('Ensure proper capitalization'); }
  const actionVerbs = ['led', 'developed', 'managed', 'created', 'implemented', 'designed', 'built', 'improved', 'increased', 'reduced', 'achieved', 'delivered', 'launched', 'optimized'];
  if (!actionVerbs.some(v => text.toLowerCase().includes(v))) { score -= 10; issues.push('Use strong action verbs'); }
  return { score: Math.max(score, 0), issues };
}

function detectJobRole(text: string): string {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [role, keywords] of Object.entries(JOB_KEYWORDS)) {
    scores[role] = keywords.filter(k => lower.includes(k.toLowerCase())).length;
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] > 0 ? best[0] : 'Software Engineer';
}

// ─── Core analyzer ────────────────────────────────────────────────────────────
export function analyzeResumeText(text: string, jobRoleOverride?: string): ResumeAnalysis {
  const jobRole = jobRoleOverride || detectJobRole(text);
  const domain = getDomainForRole(jobRole);
  const lower = text.toLowerCase();
  const keywords = JOB_KEYWORDS[jobRole] || JOB_KEYWORDS['Software Engineer'];

  const foundKeywords = keywords.filter(k => lower.includes(k.toLowerCase()));
  const missingKeywords = keywords.filter(k => !lower.includes(k.toLowerCase()));

  const hasContact = /email|phone|linkedin|@/.test(lower);
  const hasEducation = /education|university|college|degree|bachelor|master|phd|school/.test(lower);
  const hasExperience = /experience|work|employment|company|position|role|internship/.test(lower);
  const hasSkills = /skills|technologies|tools|proficient|expertise/.test(lower);
  const hasProjects = /project|portfolio|built|developed|created|launched/.test(lower);
  const hasCerts = /certification|certified|certificate|credential|license/.test(lower);

  const contactScore = hasContact ? 85 + Math.floor(Math.random() * 15) : 40;
  const educationScore = hasEducation ? 75 + Math.floor(Math.random() * 20) : 30;
  const experienceScore = hasExperience ? 70 + Math.floor(Math.random() * 25) : 25;
  const skillsScore = keywords.length > 0 ? Math.round((foundKeywords.length / keywords.length) * 100) : 50;
  const projectsScore = hasProjects ? 65 + Math.floor(Math.random() * 30) : 20;
  const certsScore = hasCerts ? 70 + Math.floor(Math.random() * 25) : 35;

  const textAnalysis = scoreText(text);
  const atsScore = Math.min(
    Math.round(
      (keywords.length > 0 ? (foundKeywords.length / keywords.length) : 0.5) * 40 +
      (hasContact ? 15 : 0) +
      (hasEducation ? 10 : 0) +
      (hasExperience ? 20 : 0) +
      (hasSkills ? 15 : 0)
    ),
    99
  );

  const overallScore = Math.min(
    Math.round(
      contactScore * 0.1 +
      educationScore * 0.15 +
      experienceScore * 0.3 +
      Math.max(skillsScore, 20) * 0.25 +
      projectsScore * 0.1 +
      certsScore * 0.05 +
      textAnalysis.score * 0.05
    ),
    99
  );

  const expLevel = text.length > 2000 ? 'Senior' : text.length > 1000 ? 'Mid-Level' : 'Entry-Level';

  const sections = [
    {
      name: 'Contact & Personal Info',
      score: contactScore,
      feedback: contactScore > 80 ? 'Well-structured contact information' : 'Missing key contact details',
      suggestions: contactScore > 80
        ? ['Add LinkedIn profile URL', 'Consider adding portfolio link', 'Include your city/location']
        : ['Add email address', 'Add phone number', 'Add LinkedIn profile'],
    },
    {
      name: 'Education',
      score: educationScore,
      feedback: educationScore > 70 ? 'Education section is clear and informative' : 'Education section needs more detail',
      suggestions: educationScore > 70
        ? ['Add GPA if above 3.5', 'Include relevant coursework', 'Add academic achievements']
        : ['Add degree name and institution', 'Include graduation year', 'List relevant courses'],
    },
    {
      name: 'Work Experience',
      score: experienceScore,
      feedback: experienceScore > 70 ? 'Good experience section with relevant roles' : 'Experience section needs stronger impact',
      suggestions: ['Quantify achievements with numbers (%, $, users)', 'Use strong action verbs', 'Highlight impact and results', 'Tailor descriptions to the target role'],
    },
    {
      name: `Skills & ${jobRole} Keywords`,
      score: Math.max(skillsScore, 20),
      feedback: skillsScore > 60
        ? `Good keyword coverage for ${jobRole} (${foundKeywords.length}/${keywords.length})`
        : `Missing important ${jobRole} keywords — only ${foundKeywords.length}/${keywords.length} found`,
      suggestions: missingKeywords.slice(0, 4).map(k => `Add "${k}" to your skills section`),
    },
    {
      name: 'Projects',
      score: projectsScore,
      feedback: projectsScore > 70 ? 'Projects section demonstrates practical skills' : 'Add more project details',
      suggestions: ['Include GitHub or live demo links', 'Describe technologies used', 'Highlight project impact', 'Quantify results (users, performance, etc.)'],
    },
    {
      name: 'Certifications',
      score: certsScore,
      feedback: certsScore > 70 ? 'Good certifications for the role' : 'Consider adding relevant certifications',
      suggestions: [`Get ${jobRole}-relevant certifications`, 'Add certification dates', 'Include issuing organization'],
    },
  ];

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (foundKeywords.length > keywords.length * 0.5) strengths.push(`Strong keyword match for ${jobRole} (${foundKeywords.length}/${keywords.length} keywords)`);
  if (hasExperience) strengths.push('Work experience section is present');
  if (hasProjects) strengths.push('Project portfolio demonstrates practical skills');
  if (hasCerts) strengths.push('Certifications add credibility');
  if (/\d+%|\d+x|\$\d+|\d+ (years|users|clients|projects)/.test(text)) strengths.push('Contains quantified achievements');
  if (hasContact) strengths.push('Contact information is included');

  if (missingKeywords.length > keywords.length * 0.5) weaknesses.push(`Missing ${missingKeywords.length} key ${jobRole} skills`);
  if (!hasProjects) weaknesses.push('No projects section found');
  if (!hasCerts) weaknesses.push('No certifications listed');
  if (!/\d/.test(text)) weaknesses.push('No quantified metrics or achievements');
  if (text.length < 500) weaknesses.push('Resume is too short — add more detail');
  weaknesses.push(...textAnalysis.issues.slice(0, 2));

  const improvementPlan = [
    `Add missing ${jobRole} keywords: ${missingKeywords.slice(0, 3).join(', ')}`,
    'Quantify at least 3 achievements with specific numbers or percentages',
    `Tailor your professional summary specifically for the ${jobRole} role`,
    'Ensure ATS-friendly formatting (no tables, columns, or images in PDF)',
    `Consider earning a ${jobRole}-specific certification to stand out`,
    'Add a strong professional summary at the very top of your resume',
  ];

  return {
    overallScore,
    jobRole,
    domain,
    sections,
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    atsCompatibility: atsScore,
    keywords: { found: foundKeywords, missing: missingKeywords.slice(0, 8) },
    experienceLevel: expLevel,
    improvementPlan,
  };
}

export function analyzeResumeForm(form: ResumeFormData, jobRoleOverride?: string): ResumeAnalysis {
  const text = [
    form.personalInfo.fullName,
    form.personalInfo.email,
    form.personalInfo.phone,
    form.personalInfo.summary,
    ...form.education.map(e => `${e.degree} ${e.institution}`),
    ...form.experience.map(e => `${e.title} ${e.company} ${e.description}`),
    ...form.skills,
    ...form.projects.map(p => `${p.name} ${p.description} ${p.tech}`),
    ...form.certifications,
  ].join(' ');

  return analyzeResumeText(text, jobRoleOverride);
}

// ─── Chat response generator ──────────────────────────────────────────────────
export function generateChatResponse(message: string, analysis: ResumeAnalysis | null, history?: ChatMessage[]): string {
  const lower = message.toLowerCase();

  if (!analysis) {
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return '👋 Hello! I\'m your AI Resume Coach. Please upload your resume or create one first, then I can provide personalized analysis and improvement tips. What can I help you with?';
    }
    return '📄 Please upload or create a resume first so I can analyze it and provide personalized advice. Once you do, I can help you improve your score, optimize for ATS, and suggest missing skills!';
  }

  const { overallScore, jobRole, domain, sections, strengths, weaknesses, keywords, atsCompatibility, improvementPlan } = analysis;

  // Handle Yes/No confirmation flow
  const lastAssistantMsg = history?.filter(m => m.role === 'assistant').pop()?.content.toLowerCase() || '';
  if (lastAssistantMsg.includes('do you have practical, hands-on experience with applying these skills')) {
    if (lower === 'yes' || lower.includes('yep') || lower.includes('i do') || lower.includes('yeah')) {
      return `🎉 **Awesome!** Having practical experience with these core skills gives you a massive advantage for the **${jobRole}** role.\n\nMake sure your **Projects** and **Experience** sections clearly demonstrate *how* you used them. Should we review your Projects section next to ensure your impact stands out?`;
    } else if (lower === 'no' || lower.includes('nope') || lower.includes('not really') || lower.includes('not yet')) {
      return `🌱 **That's totally fine!** It's great to be honest about your current level.\n\nSince you are still developing these skills, we should focus your resume on your **enthusiasm, fast learning ability**, and **foundational knowledge**.\n\nLet's highlight introductory projects or consider adding relevant certifications. Would you like some project ideas to build these skills?`;
    }
  }

  // Handle Confirmation Module initiation
  if (lower.includes('confirm') && (lower.includes('skill') || lower.includes('role'))) {
    const topSkills = keywords.found.slice(0, 3);
    const missingSkills = keywords.missing.slice(0, 2);
    const skillsToAsk = topSkills.length > 0 ? topSkills : missingSkills;
    
    return `🕵️ **Skill & Role Confirmation**\n\nI see you're targeting the **${jobRole}** position. Based on industry standards, this role heavily relies on skills like **${skillsToAsk.join(', ')}**.\n\n**Do you have practical, hands-on experience with applying these skills in real-world projects or work environments?** (Reply Yes/No)`;
  }

  // Handle Verification Questions
  if (lower.includes('verify') || lower.includes('verification') || lower.includes('question') || lower.includes('interview')) {
    const skill1 = keywords.found[0] || 'your core technologies';
    const skill2 = keywords.found[1] || 'your technical stack';
    const projectIdea = keywords.found[2] || 'a complex problem';

    return `🕵️ **AI Resume Verification Questions**\n\nHere are some role-specific and experience-based questions to validate your readiness for a **${jobRole}** role:\n\n**Skills-based Questions:**\n1. Can you explain a challenging technical problem you solved using **${skill1}**?\n2. How do you stay updated with the latest best practices in **${skill2}**?\n3. Describe a time when you had to optimize performance or scale an application related to your core skills.\n\n**Projects-based Questions:**\n1. In your most recent project, what was your primary contribution and how did you approach the architecture?\n2. How did you ensure the quality, testing, and maintainability of your code using **${projectIdea}**?\n\n**Experience-based Questions:**\n1. Can you walk me through your key responsibilities and the biggest quantitative impact you made in your previous role?\n2. Describe a situation where you had to collaborate closely with cross-functional teams to deliver a critical feature.\n\n**Scenario-based Questions:**\n1. If we experience a sudden critical failure in production, how would you go about diagnosing and resolving it?\n2. Suppose a project requirement changes completely midway through development. How do you handle the change in scope and communicate with stakeholders?\n\n*(Practice answering these out loud using the STAR method!)*`;
  }

  if (lower.includes('score') || (lower.includes('why') && lower.includes('score'))) {
    return `📊 **Your Resume Score: ${overallScore}/100**\n\nAnalyzed for: **${jobRole}** (${domain})\n\n**Section Breakdown:**\n${sections.map(s => `• **${s.name}**: ${s.score}/100`).join('\n')}\n\n**Why this score?**\n${overallScore >= 80 ? '✅ Your resume is strong!' : overallScore >= 60 ? '⚠️ Your resume is decent but has room for improvement.' : '❌ Your resume needs significant work.'} The main factors are keyword matching (${keywords.found.length} of ${keywords.found.length + keywords.missing.length} target ${jobRole} keywords found) and content quality.`;
  }

  if (lower.includes('skill') || lower.includes('keyword') || lower.includes('technical')) {
    return `🛠️ **Skills Analysis for ${jobRole}**\n\n✅ **Keywords Found (${keywords.found.length}):**\n${keywords.found.slice(0, 6).map(k => `• ${k}`).join('\n')}\n\n❌ **Missing Keywords (${keywords.missing.length}):**\n${keywords.missing.map(k => `• ${k}`).join('\n')}\n\n💡 **Tip:** Add these missing skills to your resume if you have experience with them. Even listing them under a "Familiar with" or "Learning" section can help with ATS screening.`;
  }

  if (lower.includes('ats') || lower.includes('applicant tracking')) {
    return `🤖 **ATS Compatibility Score: ${atsCompatibility}/100**\n\n${atsCompatibility >= 70 ? '✅ Your resume is fairly ATS-friendly!' : '⚠️ Your resume may struggle with ATS systems.'}\n\n**ATS Best Practices:**\n• Use standard section headings (Experience, Education, Skills)\n• Avoid tables, columns, and images\n• Use common fonts (Arial, Calibri, Times New Roman)\n• Include keywords from the job description\n• Save as .docx or simple PDF\n• Don't use headers/footers for important info`;
  }

  if (lower.includes('experience') || lower.includes('work')) {
    const expSection = sections.find(s => s.name.includes('Experience'));
    return `💼 **Work Experience Improvement Tips**\n\n${expSection ? `Current Score: **${expSection.score}/100**` : ''}\n\n**How to strengthen your experience section:**\n• **Quantify everything**: "Increased sales by 35%" beats "Improved sales"\n• **Use STAR format**: Situation, Task, Action, Result\n• **Action verbs**: Led, Developed, Implemented, Optimized, Delivered\n• **Relevance**: Tailor each bullet to the ${jobRole} role\n• **Recency**: Put most recent experience first\n\n**Example transformation:**\n❌ "Worked on website development"\n✅ "Developed 3 full-stack web applications using React & Node.js, serving 10,000+ monthly users"`;
  }

  if (lower.includes('education')) {
    return `🎓 **Education Section Tips**\n\n**What to include:**\n• Degree name and major\n• Institution name and location\n• Graduation year (or expected)\n• GPA if 3.5 or above\n• Relevant coursework (especially for entry-level)\n• Academic honors or awards\n\n**For ${jobRole} in ${domain}:**\n• Highlight courses directly relevant to ${jobRole}\n• Include any relevant thesis, capstone, or research projects\n• Add hackathons, competitions, or academic clubs`;
  }

  if (lower.includes('certif')) {
    const certMap: Record<string, string> = {
      'Web Developer': '• Meta Front-End Developer\n• freeCodeCamp Web Dev\n• Google UX Design Certificate\n• AWS Cloud Practitioner',
      'Frontend Developer': '• Meta Front-End Developer\n• Google UX Design\n• Scrimba React Course\n• freeCodeCamp Responsive Web Design',
      'Full Stack Developer': '• Meta Full-Stack Developer\n• AWS Developer Associate\n• MongoDB Certified Developer\n• Google Cloud Developer',
      'Android Developer': '• Google Associate Android Developer\n• Kotlin Certification\n• Jetpack Compose Certification',
      'iOS Developer': '• Apple Developer Certification\n• Swift Certification\n• Xcode Course Certificates',
      'Data Scientist': '• Google Professional Data Engineer\n• IBM Data Science Professional\n• Coursera ML Specialization\n• TensorFlow Developer Certificate',
      'Machine Learning Engineer': '• TensorFlow Developer Certificate\n• AWS Machine Learning Specialty\n• Google ML Engineer\n• DeepLearning.AI specializations',
      'DevOps Engineer': '• AWS DevOps Engineer\n• CKA (Kubernetes)\n• HashiCorp Terraform Associate\n• Docker Certified Associate',
      'Cybersecurity Analyst': '• CompTIA Security+\n• CEH (Certified Ethical Hacker)\n• CISSP\n• Google Cybersecurity Certificate',
      'UX Designer': '• Google UX Design Certificate\n• Nielsen Norman UX Certification\n• Interaction Design Foundation\n• Adobe XD Certification',
      'Data Analyst': '• Google Data Analytics Certificate\n• Microsoft Power BI Certification\n• Tableau Desktop Specialist\n• IBM Data Analyst Certificate',
    };
    const certs = certMap[jobRole] || '• Role-specific industry certifications\n• Project Management (PMP)\n• Google Career Certificates\n• LinkedIn Learning certificates';
    return `🏆 **Certification Recommendations for ${jobRole}**\n\n${certs}\n\n💡 Even listing in-progress certifications can boost your resume!`;
  }

  if (lower.includes('improve') || lower.includes('better') || lower.includes('suggestion') || lower.includes('tip') || lower.includes('plan')) {
    return `🚀 **Top Improvement Actions for Your ${jobRole} Resume**\n\n${improvementPlan.map((item, i) => `${i + 1}. ${item}`).join('\n')}\n\n**Quick Wins (do these first):**\n• Add a compelling professional summary (3-4 sentences)\n• Quantify 3 achievements this week\n• Add ${keywords.missing.slice(0, 2).join(' and ')} to your skills section\n\nWant me to go deeper on any specific section?`;
  }

  if (lower.includes('strength')) {
    return `💪 **Your Resume Strengths**\n\n${strengths.length > 0 ? strengths.map(s => `✅ ${s}`).join('\n') : 'No major strengths detected yet — let\'s build them!'}\n\nKeep these strong while working on your weaknesses!`;
  }

  if (lower.includes('weakness') || lower.includes('problem') || lower.includes('issue')) {
    return `⚠️ **Areas Needing Improvement**\n\n${weaknesses.map(w => `❌ ${w}`).join('\n')}\n\n**Priority order:**\n${weaknesses.slice(0, 3).map((w, i) => `${i + 1}. Fix: ${w}`).join('\n')}\n\nWould you like specific advice on any of these?`;
  }

  if (lower.includes('summary') || lower.includes('objective') || lower.includes('profile')) {
    return `✍️ **Professional Summary Tips**\n\nA great summary for **${jobRole}** should:\n• Be 3-4 sentences max\n• Start with your experience level and role\n• Highlight your top 2-3 skills\n• Mention a key achievement\n• Include the job title you're targeting\n\n**Template:**\n"[X]-year experienced ${jobRole} specializing in [top skills]. Proven track record of [key achievement with numbers]. Passionate about [relevant area] and seeking to [goal] at [type of company]."`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `👋 Hello! I'm your AI Resume Coach. Your resume scored **${overallScore}/100** for a **${jobRole}** position in ${domain}.\n\nI can help you with:\n• 📊 Understanding your score\n• 🛠️ Skills & keyword optimization\n• 💼 Improving work experience\n• 🤖 ATS compatibility\n• 🏆 Certification recommendations\n• 🚀 Overall improvement plan\n\nWhat would you like to work on?`;
  }

  return `🤖 **AI Resume Coach**\n\nBased on your **${jobRole}** resume (Score: ${overallScore}/100), here are some insights:\n\n• Your ATS compatibility is ${atsCompatibility}%\n• You have ${keywords.found.length} matching ${jobRole} keywords\n• Top priority: ${improvementPlan[0]}\n\nAsk me about: **score**, **skills**, **experience**, **education**, **certifications**, **ATS**, **improvements**, or **strengths/weaknesses**!`;
}
