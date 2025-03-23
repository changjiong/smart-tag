// src/pages/Tags/TagSystem/LibraryVersions.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../../../components/Tables/DataTable';

const LibraryVersions = () => {
  const { id } = useParams();
  const [versions, setVersions] = useState([]);
  const [tagInfo, setTagInfo] = useState({
    name: '',
    currentVersion: '',
  });

  useEffect(() => {
    // Fetch tag versions from API
    // This is a placeholder for actual API call
    const mockVersions = [
      {
        version: 'v2.1.0',
        updateTime: '2024-03-15',
        updater: '李四',
        changes: '优化计算逻辑，提升准确率',
        status: '当前版本',
      },
      {
        version: 'v2.0.0',
        updateTime: '2024-02-01',
        updater: '张三',
        changes: '重构标签生成规则',
        status: '已归档',
      },
      {
        version: 'v1.0.0',
        updateTime: '2024-01-01',
        updater: '张三',
        changes: '初始版本',
        status: '已归档',
      },
    ];
    setVersions(mockVersions);

    setTagInfo({
      name: '用户活跃度标签',
      currentVersion: 'v2.1.0',
    });
  }, [id]);

  const columns = [
    { header: '版本号', accessor: 'version' },
    { header: '更新时间', accessor: 'updateTime' },
    { header: '更新人', accessor: 'updater' },
    { header: '变更说明', accessor: 'changes' },
    { header: '状态', accessor: 'status' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{tagInfo.name}</h2>
        <p className="text-gray-600">
          当前版本：<span className="font-medium">{tagInfo.currentVersion}</span>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">版本历史</h3>
        <DataTable columns={columns} data={versions} />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">版本说明</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>版本号采用语义化版本命名规范</li>
          <li>主版本号变更代表不兼容的API修改</li>
          <li>次版本号变更代表向下兼容的功能性新增</li>
          <li>修订号变更代表向下兼容的问题修正</li>
        </ul>
      </div>
    </div>
  );
};

export default LibraryVersions;