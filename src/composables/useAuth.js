import { computed } from 'vue';

export function useAuth() {
  const user = computed(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const isAuthenticated = computed(() => {
    return !!localStorage.getItem('token');
  });

  const hasRole = (role) => {
    return user.value?.role === role;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return {
    user,
    isAuthenticated,
    hasRole,
    logout,
  };
}
