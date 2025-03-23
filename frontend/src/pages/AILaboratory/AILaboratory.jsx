import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

/**
 * AI Laboratory main component that serves as the container for all AI Laboratory subpages.
 * Similar to the Dashboard component, it acts as a parent route component.
 */
const AILaboratory = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-full">
      {/* If the user navigates directly to /ai, redirect to the models page */}
      {currentPath === '/ai' && <Navigate to="/ai/models" replace />}
      
      <div className="px-1">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">AI实验室</h1>
          <p className="text-gray-600 mt-1">探索AI能力，训练和优化您的模型，实现业务智能化</p>
        </div>
        
        {/* Render the child route components */}
        <Outlet />
      </div>
    </div>
  );
};

export default AILaboratory;