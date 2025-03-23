// src/pages/Tags/TagManagement/Generation/SQL.jsx
import React, { useState } from 'react';

const SQL = () => {
  const [sql, setSQL] = useState('');
  const [executing, setExecuting] = useState(false);

  const handleExecute = () => {
    setExecuting(true);
    // SQL execution logic here
    setTimeout(() => setExecuting(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">SQL编辑器</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-64 font-mono p-4 bg-gray-800 text-white rounded-lg"
          value={sql}
          onChange={(e) => setSQL(e.target.value)}
          placeholder="SELECT * FROM tags WHERE..."
        />
      </div>
      <button
        className={`bg-green-500 text-white px-6 py-2 rounded-lg ${
          executing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleExecute}
        disabled={executing}
      >
        {executing ? '执行中...' : '执行SQL'}
      </button>
    </div>
  );
};

export default SQL;