// src/pages/Tags/TagManagement/Registration/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Registration = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">标签注册</h1>
      <Outlet />
    </div>
  );
};

export default Registration;