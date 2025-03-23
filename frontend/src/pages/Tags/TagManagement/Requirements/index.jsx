// src/pages/Tags/TagManagement/Requirements/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Requirements = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">标签需求管理</h1>
      <Outlet />
    </div>
  );
};

export default Requirements;