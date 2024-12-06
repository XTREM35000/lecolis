export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  if (process.client) {
    const token = localStorage.getItem('token')
    if (token && !isAuthenticated.value) {
      await checkAuth()
    }
  }

  const publicRoutes = ['/', '/auth/login', '/auth/register']
  
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/auth/login')
  }

  if (isAuthenticated.value && to.path.startsWith('/auth/')) {
    return navigateTo('/dashboard')
  }
})