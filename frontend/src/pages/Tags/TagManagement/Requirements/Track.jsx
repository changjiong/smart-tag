// src/pages/Tags/TagManagement/Requirements/Track.jsx
import React, { useState } from 'react';
import DataTable from '../../../../components/Tables/DataTable';

const RequirementTrack = () => {
  const [requirements, setRequirements] = useState([]);

  const columns = [
    { header: '需求ID', accessor: 'id' },
    { header: '标签名称', accessor: 'name' },
    { header: '当前阶段', accessor: 'stage' },
    { header: '处理人', accessor: 'handler' },
    { header: '更新时间', accessor: 'updateTime' },
    { header: '状态', accessor: 'status' },
    { header: '操作', accessor: 'actions' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">需求跟踪</h2>
      <DataTable columns={columns} data={requirements} />
    </div>
  );
};

export default RequirementTrack;