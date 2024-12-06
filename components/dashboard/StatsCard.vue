<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <UIcon :name="icon" class="w-6 h-6" :class="iconClass" />
      </div>
    </template>
    <p class="text-3xl font-bold">{{ value }}</p>
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  icon: string
  iconClass?: string
}>()
</script>