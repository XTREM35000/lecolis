<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Champ Téléphone -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Téléphone</label
            >
            <div class="flex gap-2">
              <select
                v-model="countryCode"
                class="block w-20 rounded-md border border-gray-300 px-2 py-1"
              >
                <option value="+225">+225</option>
                <option value="+33">+33</option>
                <option value="+1">+1</option>
              </select>
              <input
                v-model="phoneNumber"
                type="tel"
                class="block w-full rounded-md border border-gray-300 px-3 py-1"
                placeholder="Numéro de téléphone"
                required
              />
            </div>
          </div>
          <!-- Champ Mot de passe -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Mot de passe</label
            >
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="block w-full rounded-md border border-gray-300 px-3 py-1"
                placeholder="Mot de passe"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {{ showPassword ? "🙈" : "👁️" }}
              </button>
            </div>
          </div>
        </div>
        <!-- Bouton de Connexion -->
        <div>
          <button
            type="submit"
            class="w-full py-2 px-3 bg-blue-600 text-white rounded-md"
            :disabled="loading"
          >
            {{ loading ? "Connexion..." : "Se connecter" }}
          </button>
        </div>
        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="text-red-600 text-sm text-center mt-2">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth"; // Corrigez l'import si nécessaire

// Variables réactives
const countryCode = ref("+225");
const phoneNumber = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");

// Fonction pour gérer la visibilité du mot de passe
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Fonction pour gérer la connexion
const handleLogin = async () => {
  const authStore = useAuthStore(); // Store Pinia pour gérer l'authentification

  try {
    loading.value = true;
    errorMessage.value = "";

    // Construction du numéro complet
    const fullPhoneNumber = `${countryCode.value}${phoneNumber.value.trim()}`;

    // Appel à la méthode login du store
    const success = await authStore.login({
      fullPhoneNumber,
      password: password.value.trim(),
    });

    if (!success) {
      throw new Error("Échec de la connexion. Vérifiez vos informations.");
    }
  } catch (error) {
    // Gestion des erreurs
    errorMessage.value =
      error?.response?.data?.message ||
      error.message ||
      "Une erreur est survenue. Réessayez.";
  } finally {
    loading.value = false;
  }
};
</script>
