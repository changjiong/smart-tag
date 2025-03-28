import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * 重定向组件 - 客户挽留助手
 * 重定向到实际的客户挽留助手实现
 */
const RetentionAssistantRedirect = () => {
  return <Navigate to="/applications/customer-management/churn" replace />;
};

export default RetentionAssistantRedirect; 