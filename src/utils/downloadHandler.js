/**
 * Triggers a browser download of the resume data
 * @param {Object} data - The current state of resumeJson
 * @param {string} format - 'text' or 'json'
 */
export const downloadResume = (data, format = "text") => {
  let content = "";
  let fileName = `${data.personalInfo?.name || "Resume"}_Optimized`;
  let mimeType = "";

  if (format === "json") {
    content = JSON.stringify(data, null, 2);
    fileName += ".json";
    mimeType = "application/json";
  } else {
    // Format as a clean, ATS-friendly text file
    content = `
${data.personalInfo?.name?.toUpperCase()}
${data.personalInfo?.email} | ${data.personalInfo?.phone}

PROFESSIONAL SUMMARY
${data.summary}

EXPERIENCE
${data.experience
  ?.map(
    (exp) => `
${exp.role} | ${exp.company}
${exp.duration}
${exp.description}
`,
  )
  .join("\n")}

TECHNICAL SKILLS
${data.skills?.join(", ")}
    `.trim();

    fileName += ".txt";
    mimeType = "text/plain";
  }

  // Create a blob and trigger download
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
