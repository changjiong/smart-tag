// src/pages/Tags/TagManagement/Maintenance/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Maintenance = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">标签维护</h1>
      <Outlet />
    </div>
  );
};

export default Maintenance;