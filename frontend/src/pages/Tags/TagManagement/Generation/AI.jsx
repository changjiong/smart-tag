// src/pages/Tags/TagManagement/Generation/AI.jsx
import React, { useState } from 'react';

const AI = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    // AI generation logic here
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">智能生成</h2>
      <div className="max-w-2xl">
        <textarea
          className="w-full h-32 p-4 border rounded-lg mb-4"
          placeholder="请描述您需要生成的标签规则..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className={`bg-blue-500 text-white px-6 py-2 rounded-lg ${
            generating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? '生成中...' : '开始生成'}
        </button>
      </div>
    </div>
  );
};

export default AI;