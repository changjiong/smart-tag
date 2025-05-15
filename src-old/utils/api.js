/**
 * API handling utility functions
 * Provides methods for making API requests with proper authentication and error handling
 */

import { getToken } from './auth';

// Base API URL - would be replaced with actual API endpoint in production
const API_BASE_URL = 'https://api.example.com';

// Default headers for API requests
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Handle API response
const handleResponse = async (response) => {
  if (!response.ok) {
    // Get error message from server or use default
    let errorMessage;
    try {
      const data = await response.json();
      errorMessage = data.message || data.error || `服务器错误 (${response.status})`;
    } catch (error) {
      errorMessage = `服务器错误 (${response.status})`;
    }

    // Handle 401 Unauthorized error
    if (response.status === 401) {
      // Redirect to login page or refresh token
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    throw new Error(errorMessage);
  }

  // If response body is empty, return null
  if (response.status === 204) {
    return null;
  }

  // Return JSON data
  return response.json();
};

// API request methods
export const api = {
  // GET request
  async get(endpoint, params = {}) {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  // POST request
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // PUT request
  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // PATCH request
  async patch(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // DELETE request
  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return handleResponse(response);
  },
};

// Mock API functions for development
export const mockApi = {
  async get(endpoint) {
    console.log(`Mock GET request to ${endpoint}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data responses based on endpoint
    switch (endpoint) {
      case '/api/users':
        return mockUsers;
      case '/api/tags':
        return mockTags;
      default:
        return { message: 'Mock data not available for this endpoint' };
    }
  },

  async post(endpoint, data) {
    console.log(`Mock POST request to ${endpoint}`, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true, 
      message: 'Data saved successfully', 
      data: { id: Math.floor(Math.random() * 1000), ...data } 
    };
  },

  async put(endpoint, data) {
    console.log(`Mock PUT request to ${endpoint}`, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true, 
      message: 'Data updated successfully', 
      data
    };
  },

  async delete(endpoint) {
    console.log(`Mock DELETE request to ${endpoint}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true, 
      message: 'Item deleted successfully' 
    };
  }
};

// Mock data for development
const mockUsers = [
  { id: 1, name: '张三', role: 'admin', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', role: 'user', email: 'lisi@example.com' },
];

const mockTags = [
  { id: 1, name: '高净值', category: '财富', description: '客户总资产超过100万' },
  { id: 2, name: '活期偏好', category: '行为', description: '偏好活期存款产品' },
];

// Use mock API in development, real API in production
export default process.env.NODE_ENV === 'production' ? api : mockApi;