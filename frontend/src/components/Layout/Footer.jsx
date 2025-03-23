import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-4 text-center text-sm text-gray-500">
      <div className="container mx-auto">
        <span>&copy; {currentYear} SmartTag 数据标签平台 - 版本 1.0.0</span>
      </div>
    </footer>
  );
};

export default Footer;