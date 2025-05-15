import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下次渲染能够显示错误界面
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 可以将错误记录到错误报告服务
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 自定义错误界面
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-xl font-semibold text-red-700 mb-2">页面出错了</h2>
          <p className="text-red-600 mb-4">系统遇到了一个问题，请尝试刷新页面。</p>
          <details className="bg-white p-2 rounded border border-red-100">
            <summary className="cursor-pointer text-sm text-gray-700">查看技术详情</summary>
            <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-40">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 