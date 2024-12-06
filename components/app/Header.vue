<!--components\app\Header.vue  -->

<template>
  <header class="bg-[#0070BA] shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <img
            src="../../public/logo.png"
            alt="Gogo Express 2.0"
            class="w-12 h-12"
          />
          <NuxtLink to="/" class="text-xl font-bold text-white ml-2">
            <i class="fas fa-box-open mr-2"></i> Gogo Express 2.0
          </NuxtLink>
        </div>

        <!-- Hamburger Button (small screens) -->
        <button
          @click="toggleMenu"
          class="sm:hidden text-white focus:outline-none"
        >
          <i class="fas fa-bars text-2xl"></i>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'nav-link-active': isCurrentPath(item.path) }"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden sm:flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <UButton to="/auth/login" color="blue" variant="soft">
              Se connecter
            </UButton>
            <UButton to="/auth/register" color="blue"> S'inscrire </UButton>
          </template>
          <template v-else>
            <UDropdown>
              <UButton color="gray" variant="ghost">
                <template #leading>
                  <UAvatar :src="user?.avatar" :alt="user?.name" />
                </template>
                {{ user?.name }}
              </UButton>
              <template #items>
                <UDropdownItem to="/dashboard">
                  <template #leading>
                    <UIcon name="i-heroicons-squares-2x2" />
                  </template>
                  Dashboard
                </UDropdownItem>
                <UDropdownItem to="/profile">
                  <template #leading>
                    <UIcon name="i-heroicons-user-circle" />
                  </template>
                  Profile
                </UDropdownItem>
                <UDropdownItem @click="handleLogout">
                  <template #leading>
                    <UIcon name="i-heroicons-arrow-left-on-rectangle" />
                  </template>
                  Logout
                </UDropdownItem>
              </template>
            </UDropdown>
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="sm:hidden bg-[#0070BA] px-4 py-4">
      <div class="space-y-4">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="block text-white"
          :class="{ 'nav-link-active': isCurrentPath(item.path) }"
          @click="closeMenu"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useRoute } from "vue-router";

// Navigation items
const navigationItems = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Tarifs", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const route = useRoute();

// Authentication state
const { user, isAuthenticated, logout } = useAuth();

// Mobile menu state
const isMenuOpen = ref(false);

// Functions
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const isCurrentPath = (path: string) => route.path === path;

const handleLogout = () => {
  logout();
};
</script>

<style scoped>
/* Navigation link styles */
.nav-link {
  @apply inline-flex items-center px-2 py-1 text-sm font-medium text-white hover:text-gray-200;
}
.nav-link-active {
  @apply text-white border-b-2 border-white;
}
</style>
