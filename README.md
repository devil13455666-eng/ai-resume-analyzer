# AI Resume Analyzer 📄✨

An intelligent, frontend-focused resume analyzer that provides a deep Applicant Tracking System (ATS) compatibility score, keyword matching, and personalized improvement tips. Built with React, TypeScript, and powered by the Groq API (Llama 3) for deep AI analysis and a live AI Resume Coach chatbot.

## Features 🚀

- **Resume Upload & Parsing**: Upload your resume (PDF/TXT) and instantly extract the text for analysis.
- **ATS Compatibility Scoring**: Uses domain-specific keywords and logic to calculate an overall ATS score across distinct job roles (e.g., Frontend, Backend, Data Science).
- **Deep Groq AI Analysis**: Connects with Llama-3.1-8b-instant to provide a thorough, highly objective review of your resume against industry standards.
- **Interactive AI Coach**: A built-in chat interface powered by Groq allows you to ask targeted questions about your resume, missing skills, and how to improve your work experience section.
- **Beautiful & Modern UI**: A rich, glassmorphism-inspired design with dynamic animations (Framer Motion) and modern typography (Tailwind CSS).
- **Detailed Insights**: View your keyword strengths, identified weaknesses, ATS compatibility percentage, and a concrete action plan to improve.

## Tech Stack 💻

- **Frontend Core**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Parsing**: `pdfjs-dist`
- **AI Integration**: Groq API (`llama-3.1-8b-instant`)

## Getting Started 🏁

### Prerequisites

- Node.js (v18+)
- A Groq API Key. You can get one securely from the [Groq Console](https://console.groq.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` to see the app in action!

## How It Works 🛠️

1. **Parsing**: When you upload a PDF, `pdfjs-dist` securely extracts the text content entirely in your local browser.
2. **Local Heuristics**: Our local rule-based system (`resumeAnalyzer.ts`) detects your likely target job role and calculates an initial score by matching against our extensive keyword database.
3. **Deep AI Evaluation**: Clicking the "Generate Deep Analysis" button queries the Groq API. It uses custom prompt engineering to act as a Senior Technical ATS Recruiter to give you premium feedback.
4. **Chatbot Context**: The AI Coach uses your resume's context and chat history to answer any specific questions you have.

## License 📜

Distributed under the MIT License. See `LICENSE` for more information.
