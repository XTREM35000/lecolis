// stores/auth.ts
import { defineStore } from "pinia";
import { useFetch } from "#app";

interface User {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "client" | "guest";
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthResponse {
  user: User;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setToken(token: string | null) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
    async login(email: string, password: string) {
      const { data, error } = await useFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur de connexion");
      }

      if (data.value) {
        this.setUser(data.value.user);
        this.setToken(data.value.token);
        localStorage.setItem("token", data.value.token);
      }
    },
    async checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const { data, error } = await useFetch<AuthResponse>("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (error.value) return false;

      if (data.value?.user) {
        this.setUser(data.value.user);
        return true;
      }
      return false;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) =>
      state.user?.role === "admin" || state.user?.role === "superadmin",
    isSuperAdmin: (state) => state.user?.role === "superadmin",
  },
});
