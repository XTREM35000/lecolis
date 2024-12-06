<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
          Gogo Express 2.0
        </NuxtLink>
        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <UButton to="/auth/login" color="blue" variant="soft">
              Se connecter
            </UButton>
            <UButton to="/auth/register" color="blue"> S'inscrire </UButton>
          </template>
          <UDropdown v-else>
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
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { user, isAuthenticated, logout } = useAuth();

const handleLogout = () => {
  logout();
};
</script>
