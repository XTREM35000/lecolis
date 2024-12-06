import { toast } from 'vue3-toastify'

interface User {
  id: string
  name: string
  email: string
  role: 'superadmin' | 'admin' | 'client' | 'guest'
  avatar?: string
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'superadmin')
  const isSuperAdmin = computed(() => user.value?.role === 'superadmin')

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (error.value) throw error.value

      if (data.value) {
        user.value = data.value.user
        localStorage.setItem('token', data.value.token)
        toast.success('Login successful!')
        return true
      }
      return false
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      return false
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      const { data, error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (error.value) throw error.value

      if (data.value) {
        user.value = data.value.user
        localStorage.setItem('token', data.value.token)
        toast.success('Registration successful!')
        return true
      }
      return false
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
    navigateTo('/auth/login')
    toast.success('Logged out successfully')
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return false

      const { data, error } = await useFetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (error.value) throw error.value

      if (data.value?.user) {
        user.value = data.value.user
        return true
      }
      return false
    } catch (error) {
      localStorage.removeItem('token')
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    login,
    register,
    logout,
    checkAuth
  }
}