import React, { useState } from 'react';

/**
 * Knowledge Base component for managing AI knowledge sources and references.
 */
const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  // Mock data for knowledge sources
  const documents = [
    {
      id: 1,
      title: '银行业务流程规范',
      type: 'PDF',
      category: '规章制度',
      size: '2.4 MB',
      uploadDate: '2023-08-12',
      tags: ['规范', '流程', '银行']
    },
    {
      id: 2,
      title: '客户风险评估标准',
      type: 'DOCX',
      category: '业务标准',
      size: '1.8 MB',
      uploadDate: '2023-07-25',
      tags: ['风险', '评估', '标准']
    },
    {
      id: 3,
      title: '理财产品说明书汇编',
      type: 'PDF',
      category: '产品资料',
      size: '5.7 MB',
      uploadDate: '2023-09-01',
      tags: ['理财', '产品', '说明']
    },
    {
      id: 4,
      title: '反欺诈检测规则库',
      type: 'JSON',
      category: '规则库',
      size: '1.2 MB',
      uploadDate: '2023-08-30',
      tags: ['反欺诈', '规则', '检测']
    },
    {
      id: 5,
      title: '客户投诉处理流程',
      type: 'PDF',
      category: '规章制度',
      size: '3.1 MB',
      uploadDate: '2023-06-15',
      tags: ['投诉', '处理', '流程']
    }
  ];
  
  const categories = [
    { name: '规章制度', count: 12 },
    { name: '业务标准', count: 8 },
    { name: '产品资料', count: 15 },
    { name: '规则库', count: 5 },
    { name: '培训资料', count: 9 },
    { name: '市场研究', count: 6 }
  ];
  
  // File type icon component
  const FileIcon = ({ type }) => {
    const iconColors = {
      'PDF': 'text-red-500',
      'DOCX': 'text-blue-500',
      'XLSX': 'text-green-500',
      'PPTX': 'text-orange-500',
      'JSON': 'text-violet-500',
      'TXT': 'text-gray-500'
    };
    
    return (
      <div className={`w-10 h-10 flex items-center justify-center rounded ${iconColors[type] || 'text-gray-500'} bg-opacity-20 bg-current`}>
        <span className="text-xs font-medium">{type}</span>
      </div>
    );
  };
  
  // Function to get filtered documents
  const getFilteredDocuments = () => {
    if (!searchTerm) return documents;
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'documents'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            文档库
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'datasets'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('datasets')}
          >
            数据集
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'rules'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('rules')}
          >
            规则库
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-lg font-medium text-gray-800">知识库文档</h2>
          
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索文档..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => setUploadModalOpen(true)}
            >
              上传文档
            </button>
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar - categories */}
          <div className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0 md:mr-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">文档分类</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <button className="flex items-center justify-between w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-100">
                      <span className="text-sm text-gray-700">{category.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">热门标签</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">规范</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">产品</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">风险</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md">标准</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md">规则</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">流程</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content - documents */}
          <div className="flex-1">
            {getFilteredDocuments().length > 0 ? (
              <div className="bg-white rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {getFilteredDocuments().map((doc) => (
                    <li key={doc.id} className="hover:bg-gray-50">
                      <div className="flex items-center p-4">
                        <FileIcon type={doc.type} />
                        <div className="ml-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{doc.title}</h4>
                              <div className="mt-1 flex items-center">
                                <span className="text-xs text-gray-500">{doc.category}</span>
                                <span className="mx-1.5 text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{doc.size}</span>
                                <span className="mx-1.5 text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {doc.tags.map((tag, i) => (
                                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                              </button>
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">未找到文档</h3>
                <p className="mt-1 text-sm text-gray-500">没有找到符合搜索条件的文档</p>
                <div className="mt-6">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    清除搜索
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Upload modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      上传文档
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        上传文档到知识库，支持PDF、Word、Excel、PowerPoint等格式。
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6 flex justify-center">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>选择文件</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">或拖拽文件到此处</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            最大文件大小: 10MB
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label htmlFor="doc-category" className="block text-sm font-medium text-gray-700">
                          文档分类
                        </label>
                        <select
                          id="doc-category"
                          name="doc-category"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          {categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mt-4">
                        <label htmlFor="doc-tags" className="block text-sm font-medium text-gray-700">
                          标签 (用逗号分隔)
                        </label>
                        <input
                          type="text"
                          name="doc-tags"
                          id="doc-tags"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="例如: 规范, 流程, 银行"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  上传
                </button>
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;