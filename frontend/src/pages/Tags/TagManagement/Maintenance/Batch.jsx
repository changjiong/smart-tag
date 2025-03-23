// src/pages/Tags/TagManagement/Maintenance/Batch.jsx
import React, { useState } from 'react';

const Batch = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const handleUpload = () => {
    // Simulate upload progress
    setStep(2);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setStep(3);
      }
    }, 500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">批量操作</h1>

      <div className="bg-white p-6 rounded-lg border">
        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          {[1, 2, 3].map((number) => (
            <div key={number} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {number}
              </div>
              {number < 3 && (
                <div className={`w-24 h-1 ${
                  step > number ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mt-8">
          {step === 1 && (
            <div className="text-center">
              <div className="mb-6">
                <input
                  type="file"
                  multiple
                  accept=".xlsx,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-6 py-12 border-2 border-dashed rounded-lg block cursor-pointer hover:border-blue-500"
                >
                  <div className="space-y-2">
                    <div className="text-gray-600">点击或拖拽文件到此处</div>
                    <div className="text-sm text-gray-500">支持 .xlsx, .csv 格式</div>
                  </div>
                </label>
              </div>

              {files.length > 0 && (
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">已选择文件：</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={files.length === 0}
                className={`mt-6 px-6 py-2 rounded ${
                  files.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                开始上传
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>上传进度</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-blue-500 rounded"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                正在上传文件，请耐心等待...
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="text-green-500 text-lg mb-4">上传成功！</div>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  下载结果报告
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setFiles([]);
                    setUploadProgress(0);
                  }}
                  className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  继续上传
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Batch;