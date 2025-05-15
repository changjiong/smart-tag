/**
 * 系统管理服务
 * 提供系统管理相关的API调用功能
 */

import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

// 获取用户列表
export const fetchUsers = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, { params });
    return response.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
};

// 获取角色列表
export const fetchRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error('获取角色列表失败:', error);
    throw error;
  }
};

// 获取组织列表
export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/organizations`);
    return response.data;
  } catch (error) {
    console.error('获取组织列表失败:', error);
    throw error;
  }
};

// 获取工作流列表
export const fetchWorkflows = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workflows`);
    return response.data;
  } catch (error) {
    console.error('获取工作流列表失败:', error);
    throw error;
  }
};

// 更新用户信息
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('更新用户信息失败:', error);
    throw error;
  }
};

// 更新角色信息
export const updateRole = async (roleId, roleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/roles/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    console.error('更新角色信息失败:', error);
    throw error;
  }
};

// 更新组织信息
export const updateOrganization = async (orgId, orgData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/organizations/${orgId}`, orgData);
    return response.data;
  } catch (error) {
    console.error('更新组织信息失败:', error);
    throw error;
  }
};

// 获取系统设置
export const fetchSystemSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/system/settings`);
    return response.data;
  } catch (error) {
    console.error('获取系统设置失败:', error);
    throw error;
  }
};

// 获取系统指标
export const fetchSystemMetrics = async (period) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/system/metrics`, { params: { period } });
    return response.data;
  } catch (error) {
    console.error('获取系统指标失败:', error);
    throw error;
  }
};

// 获取系统日志
export const fetchSystemLogs = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/system/logs`, { params });
    return response.data;
  } catch (error) {
    console.error('获取系统日志失败:', error);
    throw error;
  }
};
