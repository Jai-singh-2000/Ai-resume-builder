import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Calendar,
  ChevronRight,
  Loader2,
  Trophy,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/resumes/history/${user?.id}`,
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user?.id]);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-100";
    if (score >= 50) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
          <p className="text-gray-500 mt-1">
            Review and manage your previous resume optimizations.
          </p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Total: {history.length} Resumes
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-20 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No history yet</h3>
          <p className="text-gray-500">
            Your analyzed resumes will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/analyze/${item.id}`)} // You can build a view-only or edit mode here
              className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <FileText className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.file_name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-bold ${getScoreColor(item.match_score)}`}
                  >
                    <Trophy className="h-4 w-4" />
                    {item.match_score}% Match
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
