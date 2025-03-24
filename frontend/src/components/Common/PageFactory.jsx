import React from 'react';
import PlaceholderPage from './PlaceholderPage';

/**
 * 创建一个简单的页面组件
 * @param {string} title - 页面标题
 * @param {string} description - 页面描述，可选
 * @returns {React.FC} - 返回一个React组件
 */
export const createPlaceholderPage = (title, description = null) => {
  const PageComponent = () => <PlaceholderPage title={title} description={description} />;
  PageComponent.displayName = `${title.replace(/\s+/g, '')}Page`;
  return PageComponent;
};

/**
 * 创建一个带有子路由支持的页面组件
 * @param {string} title - 页面标题
 * @param {string} description - 页面描述，可选
 * @returns {React.FC} - 返回一个React组件
 */
export const createContainerPage = (title, description = null) => {
  const ContainerComponent = ({ children }) => (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">{title}</h2>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      {children}
    </div>
  );
  ContainerComponent.displayName = `${title.replace(/\s+/g, '')}Container`;
  return ContainerComponent;
}; 