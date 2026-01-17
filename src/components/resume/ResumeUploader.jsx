import React, { useState } from 'react';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

const ResumeUploader = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to extract text from PDF using PDF.js
  const extractText = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    } catch (err) {
      console.error("PDF Extraction Error:", err);
      throw new Error("Failed to read PDF content");
    }
  };

  const handleFile = async (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setFileName(file.name);

    try {
      const text = await extractText(file);
      // Pass the extracted text and file metadata to the parent component
      onUploadSuccess({ fileName: file.name, text });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Drag & Drop Handlers
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 transition-all flex flex-col items-center justify-center text-center
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
          ${error ? 'border-red-300 bg-red-50' : ''}
        `}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFile(e.target.files[0])}
          accept=".pdf"
        />

        {loading ? (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
            <p className="text-gray-600 font-medium">Extracting text from {fileName}...</p>
          </div>
        ) : (
          <>
            <div className={`p-4 rounded-full mb-4 ${error ? 'bg-red-100' : 'bg-blue-100'}`}>
              {error ? <AlertCircle className="h-8 w-8 text-red-600" /> : <Upload className="h-8 w-8 text-blue-600" />}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900">
              {fileName || "Click or drag resume here"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Only PDF files are supported</p>
            
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;