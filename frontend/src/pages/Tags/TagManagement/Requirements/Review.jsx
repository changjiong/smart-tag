// src/pages/Tags/TagManagement/Requirements/Review.jsx
import React, { useState } from 'react';
import DataTable from '../../../../components/Tables/DataTable';

const RequirementReview = () => {
  const [requirements, setRequirements] = useState([]);

  const columns = [
    { header: '需求ID', accessor: 'id' },
    { header: '标签名称', accessor: 'name' },
    { header: '提交人', accessor: 'submitter' },
    { header: '提交时间', accessor: 'submitTime' },
    { header: '状态', accessor: 'status' },
    { header: '操作', accessor: 'actions' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">需求审核</h2>
      <DataTable columns={columns} data={requirements} />
    </div>
  );
};

export default RequirementReview;