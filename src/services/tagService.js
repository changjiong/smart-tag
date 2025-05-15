/**
 * 标签中心服务
 * 提供标签相关的API调用功能
 */

import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

// 获取标签列表
export const fetchTags = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`, { params });
    return response.data;
  } catch (error) {
    console.error('获取标签列表失败:', error);
    throw error;
  }
};

// 获取标签分类
export const fetchTagCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags/categories`);
    return response.data;
  } catch (error) {
    console.error('获取标签分类失败:', error);
    throw error;
  }
};

// 获取标签元数据
export const fetchTagMetadata = async (tagId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags/${tagId}/metadata`);
    return response.data;
  } catch (error) {
    console.error('获取标签元数据失败:', error);
    throw error;
  }
};

// 创建新标签
export const createTag = async (tagData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tags`, tagData);
    return response.data;
  } catch (error) {
    console.error('创建标签失败:', error);
    throw error;
  }
};

// 更新标签
export const updateTag = async (tagId, tagData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tags/${tagId}`, tagData);
    return response.data;
  } catch (error) {
    console.error('更新标签失败:', error);
    throw error;
  }
};

// 删除标签
export const deleteTag = async (tagId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tags/${tagId}`);
    return response.data;
  } catch (error) {
    console.error('删除标签失败:', error);
    throw error;
  }
};

// 获取标签质量指标
export const fetchTagQualityMetrics = async (tagId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags/${tagId}/quality`);
    return response.data;
  } catch (error) {
    console.error('获取标签质量指标失败:', error);
    throw error;
  }
};

// 获取标签告警信息
export const fetchTagAlerts = async (tagId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags/${tagId}/alerts`);
    return response.data;
  } catch (error) {
    console.error('获取标签告警信息失败:', error);
    throw error;
  }
};
