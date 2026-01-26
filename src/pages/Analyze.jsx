import { useState } from "react";
import axios from "axios";
// import { useAuth } from "../hooks/useAuth";
import ResumeUploader from "../components/resume/ResumeUploader";
import AnalysisView from "../components/resume/AnalysisView";
import ChatWindow from "../components/session/ChatWindow";
import {
  Sparkles,
  ArrowLeft,
  Loader2,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { applySuggestion } from "../utils/jsonHandler";
import ResumePreview from "../components/resume/ResumePreview";
import { downloadResume } from "../utils/downloadHandler";
import { Download, FileJson, FileText, ChevronDown } from "lucide-react";

const Analyze = () => {
  // const { user } = useAuth(); // Get logged-in user ID for the backend
  const [step, setStep] = useState("upload");
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [error, setError] = useState(null);

  // ... inside your component
  const [resumeJson, setResumeJson] = useState({}); // initialResumeData - The structured JSON version of the resume
  const [suggestions, setSuggestions] = useState([]); //suggestionsFromDB

  console.log(suggestions);

  const handleAcceptSuggestion = async (suggestion) => {
    // 1. Update the local JSON structure
    const updatedJson = applySuggestion(
      resumeJson,
      suggestion.json_path,
      suggestion.newText,
    );
    setResumeJson(updatedJson);

    // 2. Mark suggestion as accepted in Supabase (Backend Call)
    try {
      await axios.patch(
        `http://localhost:5000/api/suggestions/${suggestion.id}`,
        {
          status: "accepted",
        },
      );

      // 3. Remove from UI list or mark as done
      setSuggestions((prev) => prev.filter((s) => s.id !== suggestion.id));

      alert("Resume updated successfully!");
    } catch (err) {
      console.error("Failed to update suggestion status", err);
    }
  };

  const handleUploadSuccess = (data) => {
    setResumeData(data);
    setError(null);
  };

  const startAIAnalysis = async () => {
    if (!resumeData || !jobDescription) {
      setError("Please provide both a resume and a job description.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // API call to your Node.js backend
      const response = await axios.post(
        "http://localhost:5000/api/resumes/analyze",
        {
          resumeText: resumeData.text,
          jobDescription: jobDescription,
          fileName: resumeData.fileName,
          userId: "abcdef",
        },
      );
      setAnalysisData(response.data);
      setStep("results");
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.response?.data?.error || "Failed to connect to AI server.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {step === "upload" ? "Resume Intelligence" : "Analysis Results"}
          </h1>
          <p className="text-gray-500 mt-1">
            {step === "upload"
              ? "Optimize your profile for your dream job."
              : "AI-generated suggestions based on your target role."}
          </p>
        </div>
        {step === "results" && (
          <button
            onClick={() => setStep("upload")}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Analyze Another
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {step === "upload" ? (
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1: Upload */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="bg-blue-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[10px]">
                  1
                </span>
                Upload Resume (PDF)
              </label>
              <ResumeUploader onUploadSuccess={handleUploadSuccess} />
            </div>

            {/* Step 2: JD */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="bg-blue-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[10px]">
                  2
                </span>
                Job Description
              </label>
              <textarea
                className="w-full h-[220px] p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-sm shadow-sm"
                placeholder="Paste the job requirements here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center pb-10">
            <button
              onClick={startAIAnalysis}
              disabled={isAnalyzing || !resumeData || !jobDescription}
              className="group relative flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Gemini is analyzing...
                </>
              ) : (
                <>
                  Run AI Analysis
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 pb-10">
          <div className="xl:col-span-3">
            <AnalysisView results={analysisData} />
          </div>
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" /> AI Assistant
              </h3>
              <ChatWindow resumeId={analysisData.resumeId} />
            </div>
          </div>
        </div>
      )}

      {/* Download button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Live Preview</h2>

        <div className="relative">
          <button
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all"
          >
            <Download className="h-4 w-4" />
            Export Resume
            <ChevronDown className="h-4 w-4" />
          </button>

          {showDownloadMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <button
                onClick={() => {
                  downloadResume(resumeJson, "text");
                  setShowDownloadMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                <FileText className="h-4 w-4 text-blue-500" />
                Download as Text (.txt)
              </button>
              <button
                onClick={() => {
                  downloadResume(resumeJson, "json");
                  setShowDownloadMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <FileJson className="h-4 w-4 text-purple-500" />
                Download Data (.json)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Column */}
      <div className="lg:w-2/5 space-y-6 overflow-y-auto max-h-[90vh] pr-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Improvement Suggestions ({suggestions.length})
        </h2>
        {suggestions.map((s) => (
          <SuggestionCard
            key={s.id}
            suggestion={s}
            onAccept={() => handleAcceptSuggestion(s)}
            onReject={(id) =>
              setSuggestions((prev) => prev.filter((item) => item.id !== id))
            }
          />
        ))}
        {suggestions?.length === 0 && (
          <div className="p-10 bg-green-50 rounded-xl text-center border border-green-200">
            <p className="text-green-700 font-bold">
              All set! Your resume is optimized.
            </p>
          </div>
        )}
      </div>

      {/* Real-time Preview Column */}
      <div className="lg:w-3/5">
        <div className="sticky top-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Live Preview</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
              Download Optimized PDF
            </button>
          </div>
          <ResumePreview data={resumeJson} />
        </div>
      </div>
    </div>
  );
};

export default Analyze;
