import { useState } from 'react';
import ResumeUploader from '../components/resume/ResumeUploader';
import AnalysisView from '../components/resume/AnalysisView';
import ChatWindow from '../components/session/ChatWindow';
import { Sparkles, ArrowLeft } from 'lucide-react';

const Analyze = () => {
  const [step, setStep] = useState('upload'); // 'upload' or 'results'
  const [analysisData, setAnalysisData] = useState(null);

  // This function simulates the API call to Gemini
  const handleStartAnalysis = (extractedData) => {
    console.log("Extracted Text ready for AI:", extractedData.text);
    
    // MOCK DATA: In the next step, we will replace this with a real fetch() to your backend
    const mockResults = {
      score: 75,
      summary: "Your resume has a strong technical foundation, but your bullet points lack quantifiable achievements (e.g., 'Increased efficiency by 20%').",
      suggestions: [
        { id: 1, section: 'Experience', oldText: 'Worked on a React project.', newText: 'Developed a high-traffic React dashboard, reducing load times by 30%.', reason: 'Adding metrics increases credibility.' },
        { id: 2, section: 'Skills', oldText: 'Knows Javascript', newText: 'Advanced JavaScript (ES6+), React.js, and Node.js', reason: 'Specific keywords improve ATS ranking.' }
      ]
    };

    setAnalysisData(mockResults);
    setStep('results');
  };

  return (
    <div className="space-y-6">
      {/* Header logic */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 'upload' ? 'Resume Analyzer' : 'AI Analysis Results'}
          </h1>
          <p className="text-gray-500">
            {step === 'upload' ? 'Upload your PDF and paste the job description.' : 'Review suggestions to improve your match score.'}
          </p>
        </div>
        
        {step === 'results' && (
          <button 
            onClick={() => setStep('upload')}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Start New Analysis
          </button>
        )}
      </div>

      {step === 'upload' ? (
        <div className="max-w-4xl mx-auto space-y-8">
           {/* Here you would put your Uploader and JD Textarea */}
           <ResumeUploader onUploadSuccess={handleStartAnalysis} />
           {/* ... Job Description Input from previous step ... */}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Results column */}
          <div className="xl:col-span-2">
            <AnalysisView results={analysisData} />
          </div>

          {/* Chat column */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" /> AI Assistant
              </h3>
              <ChatWindow />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyze;