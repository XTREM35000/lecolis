<!-- pages\auth\register.vue -->
<template>
  <div class="min-h-screen flex items-top justify-center bg-[#F5F7FA]">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-red-900">Créer un compte</h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- Nom et Prénom -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom</label>
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Nom"
                required
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Prénom</label
              >
              <input
                v-model="form.firstName"
                type="text"
                placeholder="Prénom"
                required
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="email@gmail.com"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
            />
          </div>

          <!-- Téléphone -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Téléphone</label
            >
            <div class="flex gap-2">
              <select
                v-model="form.countryCode"
                class="mt-1 block w-24 rounded-md border border-gray-300 px-3 py-2 focus:border-[#0070BA] focus:ring-[#0070BA]"
              >
                <option value="+225">+225</option>
                <option value="+33">+33</option>
                <option value="+1">+1</option>
              </select>
              <input
                ref="phoneInput"
                v-model="form.phoneNumber"
                type="tel"
                required
                placeholder="00 00 00 00 00"
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
              />
            </div>
          </div>

          <!-- Rôle et Mot de passe -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!-- Rôle -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Rôle</label
              >
              <select
                v-model="form.role"
                required
                class="mt-1 block rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
              >
                <option disabled value="">Sélection rôle</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user">Utilisateur</option>
                <option value="client">Client</option>
                <option value="visitor">Visiteur</option>
              </select>
            </div>

            <!-- Mot de passe -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Mot de passe</label
              >
              <div class="relative">
                <input
                  v-model="form.password"
                  placeholder="Mot de passe"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="mt-1 block w-full sm:w-[90%] rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-6 top-1/2 transform -translate-y-1/2 text-xl"
                >
                  {{ showPassword ? "🙈" : "👁️" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070BA] hover:bg-[#003087] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070BA]"
          >
            S'inscrire
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Déjà inscrit ?
          <NuxtLink
            to="/auth/login"
            class="font-medium text-[#0070BA] hover:text-[#003087]"
          >
            Se connecter
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import IMask from "imask";
import { toast } from "vue3-toastify";
import { navigateTo } from "nuxt/app";

const form = ref({
  lastName: "",
  firstName: "",
  email: "",
  countryCode: "+225",
  phoneNumber: "",
  password: "",
  role: "",
});

const showPassword = ref(false);
const phoneInput = ref(null);

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

const cleanPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/[\s_]/g, "").slice(0, 10);

const handleRegister = async () => {
  try {
    const cleanedPhoneNumber = cleanPhoneNumber(form.value.phoneNumber);
    const fullPhoneNumber = `${form.value.countryCode}${cleanedPhoneNumber}`;

    await $fetch("/api/auth/register", {
      method: "POST",
      body: { ...form.value, fullPhoneNumber },
    });

    toast.success("Inscription réussie !");
    navigateTo("/auth/login");
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    toast.error(
      (error as any).data?.message || "Erreur lors de l'inscription."
    );
  }
};
</script>
