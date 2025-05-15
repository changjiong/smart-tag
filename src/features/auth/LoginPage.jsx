import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 登录页面组件
 * 处理用户登录认证
 */
const LoginPage = ({ setAuthenticated }) => {
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
      // Clean up input values to avoid whitespace issues
      const username = formData.username.trim();
      const password = formData.password.trim();

      console.log('Attempting login with:', username);

      // Mock API call for authentication
      // In a real application, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication check with exact comparison
      if (username === 'admin' && password === 'admin123') {
        console.log('Login successful');

        // Store token in localStorage (in a real app, this would be a JWT token)
        const token = 'mock-jwt-token-' + Date.now(); // Add timestamp to make token unique
        localStorage.setItem('auth_token', token);

        // Store user data
        const userData = {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Verify data was stored correctly
        const storedToken = localStorage.getItem('auth_token');
        console.log('Stored token verification:', storedToken === token ? 'Success' : 'Failed');

        // Update auth state
        setAuthenticated(true);

        // Navigate to dashboard
        console.log('Navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('Login failed: username or password incorrect');
        console.log('Entered username:', username, 'Entered password:', password);
        console.log('Expected: username="admin", password="admin123"');
        setLoginError('用户名或密码错误 (请使用: admin / admin123)');
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
                d="M16.25 22.5C16.25 24.5711 17.9289 26.25 20 26.25C22.0711 26.25 23.75 24.5711 23.75 22.5C23.75 20.4289 22.0711 18.75 20 18.75C17.9289 18.75 16.25 20.4289 16.25 22.5Z"
                fill="white"
              />
              <path
                d="M32.5 18.75C30.4289 18.75 28.75 20.4289 28.75 22.5C28.75 24.5711 30.4289 26.25 32.5 26.25C34.5711 26.25 36.25 24.5711 36.25 22.5C36.25 20.4289 34.5711 18.75 32.5 18.75Z"
                fill="white"
              />
              <path
                d="M20 31.25C15.1675 31.25 11.25 35.1675 11.25 40H15C15 37.2386 17.2386 35 20 35C22.7614 35 25 37.2386 25 40H28.75C28.75 35.1675 24.8325 31.25 20 31.25Z"
                fill="white"
              />
              <path
                d="M36.25 40C36.25 37.2386 34.0114 35 31.25 35C28.4886 35 26.25 37.2386 26.25 40H30C30 38.6193 31.1193 37.5 32.5 37.5C33.8807 37.5 35 38.6193 35 40H36.25Z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SmartTag FS</h1>
          <p className="text-gray-500">智能标签管理系统</p>
        </div>

        {loginError && (
          <div className="mb-6">
            <div className="rounded-lg bg-red-50 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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

export default LoginPage;
