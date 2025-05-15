/**
 * 客群画像服务
 * 提供客群画像相关的API调用功能
 */

import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

// 获取客户数据
export const fetchCustomerData = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`, { params });
    return response.data;
  } catch (error) {
    console.error('获取客户数据失败:', error);
    throw error;
  }
};

// 获取客群数据
export const fetchGroupData = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer-groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('获取客群数据失败:', error);
    throw error;
  }
};

// 创建客群
export const createCustomerGroup = async (groupData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customer-groups`, groupData);
    return response.data;
  } catch (error) {
    console.error('创建客群失败:', error);
    throw error;
  }
};

// 更新客群
export const updateCustomerGroup = async (groupId, groupData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/customer-groups/${groupId}`, groupData);
    return response.data;
  } catch (error) {
    console.error('更新客群失败:', error);
    throw error;
  }
};

// 删除客群
export const deleteCustomerGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/customer-groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('删除客群失败:', error);
    throw error;
  }
};

// 获取客群洞察
export const fetchGroupInsights = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer-groups/${groupId}/insights`);
    return response.data;
  } catch (error) {
    console.error('获取客群洞察失败:', error);
    throw error;
  }
};

// 获取漏斗数据
export const fetchFunnelData = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portrait/funnel`, { params });
    return response.data;
  } catch (error) {
    console.error('获取漏斗数据失败:', error);
    throw error;
  }
};

// 获取YRFM模型数据
export const fetchYRFMData = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portrait/yrfm`, { params });
    return response.data;
  } catch (error) {
    console.error('获取YRFM模型数据失败:', error);
    throw error;
  }
};
