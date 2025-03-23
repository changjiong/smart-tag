import React from 'react';
import { Outlet } from 'react-router-dom';

const TagsRouter = () => {
  return (
    <div className="h-full w-full p-6">
      {/* Tag Center Content */}
      <div className="h-full w-full bg-white rounded-lg shadow-sm p-6">
        {/* Render nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default TagsRouter;