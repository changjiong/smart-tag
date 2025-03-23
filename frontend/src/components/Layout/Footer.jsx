import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div>
          © {currentYear} 数智标签画像系统 版权所有
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-4">
          <span>系统版本: v1.0.0</span>
          <a href="#" className="hover:text-blue-600">帮助中心</a>
          <a href="#" className="hover:text-blue-600">联系我们</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;