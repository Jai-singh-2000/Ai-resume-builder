import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Search,
  Zap,
  ShieldCheck,
  FileCheck,
  ArrowRight,
  Github,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ResumeAI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-semibold hover:text-blue-600 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Career Optimization</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Beat the <span className="text-blue-600">ATS</span> with Gemini
              AI.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Upload your resume and get instant, actionable suggestions to
              match any job description. Accept changes with one click and see
              your resume update in real-time.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                Start Free Analysis
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Abstract Hero Image/UI Mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 transform rotate-2">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm italic">
                  "AI Suggested: Change 'Worked on React' to 'Engineered
                  scalable React architectures...'"
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Everything you need to get hired
            </h2>
            <p className="text-gray-600">
              Built for modern job seekers using cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="Instant Scoring"
              desc="Get an immediate ATS compatibility score based on specific job descriptions."
            />
            <FeatureCard
              icon={<FileCheck className="h-6 w-6 text-blue-500" />}
              title="One-Click Updates"
              desc="Accept AI suggestions to update your resume JSON structure automatically."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
              title="Secure Storage"
              desc="Powered by Supabase, your resumes and analysis history are always safe."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2026 AI Resume Analyzer. IGNOU MCA Project.
          </p>
          <div className="flex items-center gap-6 text-gray-400">
            <Github className="h-5 w-5 hover:text-gray-900 cursor-pointer" />
            <span className="text-sm">Developed by Jai Singh</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default Landing;
