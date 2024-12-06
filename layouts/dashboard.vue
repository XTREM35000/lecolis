<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-6">
        <aside class="w-64 flex-shrink-0">
          <nav class="bg-white rounded-lg shadow-sm p-4">
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/dashboard"
                  class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': route.path === '/dashboard' }"
                >
                  <UIcon name="i-heroicons-squares-2x2" />
                  <span>Overview</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/shipments"
                  class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/shipments') }"
                >
                  <UIcon name="i-heroicons-truck" />
                  <span>Shipments</span>
                </NuxtLink>
              </li>
              <li v-if="isAdmin">
                <NuxtLink
                  to="/dashboard/users"
                  class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/users') }"
                >
                  <UIcon name="i-heroicons-users" />
                  <span>Users</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/notifications"
                  class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/notifications') }"
                >
                  <UIcon name="i-heroicons-bell" />
                  <span>Notifications</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/settings"
                  class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/settings') }"
                >
                  <UIcon name="i-heroicons-cog-6-tooth" />
                  <span>Settings</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { isAdmin } = useAuth()
</script>