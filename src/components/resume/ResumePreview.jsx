import React from "react";
import { User, Mail, Briefcase, GraduationCap, Code } from "lucide-react";

const ResumePreview = ({ data }) => {
  if (!data)
    return (
      <div className="p-8 text-center text-gray-400">No data to preview</div>
    );

  return (
    <div className="bg-white shadow-2xl rounded-lg p-8 min-h-[800px] text-gray-800 font-sans border border-gray-100 overflow-y-auto max-h-[90vh]">
      {/* Header Section */}
      <div className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
          {data.personalInfo?.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" /> {data.personalInfo?.email}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" /> {data.personalInfo?.phone}
          </span>
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-700 uppercase border-b border-gray-200 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience Section - This is usually where json_path targets */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-blue-700 uppercase border-b border-gray-200 mb-3 flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> Experience
        </h2>
        <div className="space-y-4">
          {data.experience?.map((exp, index) => (
            <div key={index} className="group transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-600">
                {exp.company}
              </p>
              <p className="text-sm mt-1 text-gray-700 leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-lg font-bold text-blue-700 uppercase border-b border-gray-200 mb-3 flex items-center gap-2">
          <Code className="h-5 w-5" /> Technical Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumePreview;
