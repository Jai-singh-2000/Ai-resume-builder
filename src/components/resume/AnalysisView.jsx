import React from 'react';
import SuggestionCard from './SuggestionCard';
import { Zap, Target, TrendingUp } from 'lucide-react';

const AnalysisView = ({ results }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Target className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">ATS Score</p>
            <p className="text-2xl font-bold text-gray-900">{results.score}%</p>
          </div>
        </div>
        {/* Add more stats cards as needed */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" /> Improvement Suggestions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {results.suggestions.map(s => (
              <SuggestionCard key={s.id} suggestion={s} onAccept={() => {}} onReject={() => {}} />
            ))}
          </div>
        </div>

        {/* Sidebar: Overall Feedback */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> AI Insights
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              {results.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;