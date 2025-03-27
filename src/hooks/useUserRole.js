import { useState, useEffect } from 'react';

// 临时模拟用户角色服务
// 实际项目中应从用户认证系统获取
const mockFetchUserRole = async () => {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 从本地存储中获取角色，如果没有则设置一个默认角色
  // 这里可以根据实际需求修改为从API获取
  const savedRole = localStorage.getItem('userRole');
  
  // 返回角色，如果没有保存过角色，随机分配一个以便演示
  if (savedRole) {
    return savedRole;
  } else {
    // 随机分配一个角色用于演示
    const roles = ['business_analyst', 'manager', 'data_scientist', 'default_user'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    localStorage.setItem('userRole', randomRole);
    return randomRole;
  }
};

// 自定义Hook，用于在组件中获取用户角色
export const useUserRole = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        setIsLoading(true);
        const role = await mockFetchUserRole();
        setUserRole(role);
      } catch (err) {
        console.error('Failed to fetch user role', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  // 提供更新角色的方法，用于测试不同角色的UI
  const updateRole = async (newRole) => {
    try {
      setIsLoading(true);
      // 在实际应用中，这里可能需要与后端API交互
      localStorage.setItem('userRole', newRole);
      setUserRole(newRole);
    } catch (err) {
      console.error('Failed to update user role', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { userRole, isLoading, error, updateRole };
}; 