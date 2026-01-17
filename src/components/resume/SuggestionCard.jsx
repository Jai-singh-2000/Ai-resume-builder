import React from 'react';
import { Check, X, Info, ArrowRight } from 'lucide-react';

const SuggestionCard = ({ suggestion, onAccept, onReject }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {suggestion.section}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => onReject(suggestion.id)}
            className="p-1.5 hover:bg-red-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onAccept(suggestion.id)}
            className="p-1.5 hover:bg-green-100 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
          >
            <Check className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-400 mb-1 italic">Current Version:</p>
          <p className="text-sm text-gray-600 line-through bg-red-50 p-2 rounded">{suggestion.oldText}</p>
        </div>
        
        <div className="flex justify-center">
          <ArrowRight className="h-4 w-4 text-gray-300" />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-400 mb-1 italic">AI Suggestion:</p>
          <p className="text-sm text-gray-900 font-medium bg-green-50 p-2 rounded">{suggestion.newText}</p>
        </div>

        <div className="flex items-start gap-2 pt-2 text-xs text-blue-700 bg-blue-50/50 p-2 rounded">
          <Info className="h-4 w-4 flex-shrink-0" />
          <p><strong>Reason:</strong> {suggestion.reason}</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;