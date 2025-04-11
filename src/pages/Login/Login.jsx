import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    }
    
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少6位';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      // Mock API call for authentication
      // In a real application, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication check
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Store token in localStorage (in a real app, this would be a JWT token)
        localStorage.setItem('auth_token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          role: 'admin'
        }));
        
        // Update auth state
        setAuthenticated(true);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setLoginError('用户名或密码错误');
      }
    } catch (error) {
      console.error('登录失败:', error);
      setLoginError('登录失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0Z"
                fill="#3056D3"
              />
              <path
                d="M30.625 26.25L25 20.625L19.375 26.25L25 31.875L30.625 26.25Z"
                fill="white"
              />
              <path
                d="M25 12.5L12.5 25L25 37.5L37.5 25L25 12.5Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">观澜标签画像系统</h2>
        </div>
        
        {loginError && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="mb-2.5 block font-medium text-gray-700"
            >
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              className={`w-full rounded-lg border bg-white py-3 px-5 outline-none transition ${errors.username ? 'border-danger' : 'border-stroke'}`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2.5 block font-medium text-gray-700"
            >
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              className={`w-full rounded-lg border bg-white py-3 px-5 outline-none transition ${errors.password ? 'border-danger' : 'border-stroke'}`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                记住我
              </label>
            </div>
            <div>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                忘记密码?
              </a>
            </div>
          </div>
          
          <div className="mb-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg bg-blue-600 py-3 px-5 font-medium text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  登录中...
                </span>
              ) : (
                '登录'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">测试账户：admin / admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;