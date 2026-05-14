import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ManageResume = () => {
  const [generating, setGenerating] = useState(false);
  const [texUrl, setTexUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [texPreview, setTexPreview] = useState('');
  const [error, setError] = useState('');
  const [lastGenerated, setLastGenerated] = useState(null);

  useEffect(() => {
    // Check if a resume already exists in storage
    checkExistingResume();
  }, []);

  const checkExistingResume = async () => {
    const { data } = supabase.storage.from('resume').getPublicUrl('resume.tex');
    if (data?.publicUrl) {
      setTexUrl(data.publicUrl);
      setPdfUrl(`https://latexonline.cc/compile?url=${encodeURIComponent(data.publicUrl)}`);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setTexPreview('');

    try {
      const response = await fetch('/.netlify/functions/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate resume');
      }

      setTexUrl(result.texUrl);
      setPdfUrl(result.pdfUrl);
      setTexPreview(result.texContent);
      setLastGenerated(new Date().toLocaleString());
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-2">Resume Generator</h2>
      <p className="text-sm text-gray-500 mb-6">
        AI-powered resume generation using Google Gemini. Automatically syncs with your portfolio data and generates a professional LaTeX resume.
      </p>

      {/* Generate Button */}
      <div className="mb-8">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {generating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Generating with Gemini AI...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18M3 12h18"></path>
              </svg>
              Generate Resume
            </>
          )}
        </button>
        {lastGenerated && (
          <p className="text-xs text-gray-500 mt-2">Last generated: {lastGenerated}</p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Download Links */}
      {texUrl && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Download Links</h3>
          <div className="flex gap-4">
            <a
              href={texUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download .tex
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </a>
          </div>
        </div>
      )}

      {/* Preview */}
      {texPreview && (
        <div>
          <h3 className="text-lg font-medium mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Generated LaTeX Preview</h3>
          <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-mono overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
            {texPreview}
          </pre>
        </div>
      )}

      {/* How it works */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <h4 className="font-medium text-sm mb-2">🤖 How it works</h4>
        <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
          <li>Fetches your latest About, Experience, Projects & Skills from Supabase</li>
          <li>Sends data to Google Gemini AI with your exact LaTeX formatting preferences</li>
          <li>AI generates a professional resume.tex matching your template style</li>
          <li>Stores .tex in Supabase Storage and compiles PDF via latexonline.cc</li>
        </ol>
      </div>
    </div>
  );
};

export default ManageResume;
