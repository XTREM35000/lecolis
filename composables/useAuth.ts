// composables\useAuth.ts
import { navigateTo } from "#app";
import { toast } from "vue3-toastify";
// composables/useAuth.ts
import { useAuthStore } from "@/stores/auth"; // importez le store

export const useAuth = () => {
  const authStore = useAuthStore();

  // Méthodes de login, logout, et vérification de l'authentification
  const login = async (email: string, password: string) => {
    try {
      await authStore.login(email, password);
      toast.success("Connexion réussie !");
      navigateTo("/dashboard"); // Redirection après connexion
    } catch (error: any) {
      toast.error(error.message || "Échec de la connexion");
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    // Vous pouvez adapter l'enregistrement dans votre API ici
  };

  const logout = () => {
    authStore.logout();
    toast.success("Déconnexion réussie");
    navigateTo("/auth/login");
  };

  const checkAuth = async () => {
    return await authStore.checkAuth();
  };

  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isAdmin: authStore.isAdmin,
    isSuperAdmin: authStore.isSuperAdmin,
    login,
    register,
    logout,
    checkAuth,
  };
};
