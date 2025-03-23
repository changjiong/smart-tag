// src/pages/Tags/TagManagement/Generation/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Generation = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">标签生成</h1>
      <Outlet />
    </div>
  );
};

export default Generation;