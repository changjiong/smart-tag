/**
 * 应用常量配置文件
 * 集中管理全局常量
 */

// API基础URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// 分页默认参数
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT_PAGE = 1;

// 响应状态码
export const STATUS_SUCCESS = 200;
export const STATUS_CREATED = 201;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_SERVER_ERROR = 500;

// 本地存储键名
export const STORAGE_TOKEN_KEY = 'smarttag_token';
export const STORAGE_USER_INFO_KEY = 'smarttag_user';
export const STORAGE_THEME_KEY = 'smarttag_theme';

// 请求超时时间(毫秒)
export const REQUEST_TIMEOUT = 15000;

// 主题配置
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
