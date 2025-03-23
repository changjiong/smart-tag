// src/pages/Tags/TagManagement/Generation/Import.jsx
import React, { useState } from 'react';

const Import = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    // Upload logic here
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">批量导入</h2>
      <div className="max-w-xl">
        <div className="border-2 border-dashed rounded-lg p-8 text-center mb-4">
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          >
            点击上传文件
          </label>
          {file && <p className="mt-2 text-gray-600">{file.name}</p>}
        </div>
        <button
          className={`bg-blue-500 text-white px-6 py-2 rounded-lg ${
            !file || uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? '导入中...' : '开始导入'}
        </button>
      </div>
    </div>
  );
};

export default Import;