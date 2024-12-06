<template>
  <div class="max-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">
      <div class="text-center mb-4">
        <h2 class="text-3xl font-extrabold text-red-900">
          Connexion à votre compte
        </h2>
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <!-- Champ Téléphone -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Téléphone</label
            >
            <div class="flex gap-2">
              <select
                v-model="countryCode"
                class="mt-1 block w-24 rounded-md border border-gray-300 px-3 py-2 focus:border-[#0070BA] focus:ring-[#0070BA]"
              >
                <option value="+225">+225</option>
                <option value="+33">+33</option>
                <option value="+1">+1</option>
              </select>
              <input
                v-model="phoneNumber"
                ref="phoneInput"
                type="tel"
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
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
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
                placeholder="Mot de passe"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
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
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth"; // Corrigez l'import si nécessaire
import IMask from "imask";

// Variables réactives
const countryCode = ref("+225");
const phoneNumber = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const phoneInput = ref(null); // Référence pour l'élément input

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

// Appliquer le masque au champ téléphone lors du montage
onMounted(() => {
  if (phoneInput.value) {
    // Appliquer un masque de type téléphone avec des espaces entre les paires de chiffres
    IMask(phoneInput.value, {
      mask: "00 00 00 00 00", // Format spécifique de "00 00 00 00 00"
      lazy: false, // Le masque s'applique immédiatement
    });
  }
});
</script>
