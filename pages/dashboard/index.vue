<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard Overview</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Active Shipments"
        :value="stats.activeShipments"
        icon="i-heroicons-truck"
        icon-class="text-blue-600"
      >
        <template #footer>
          <NuxtLink
            to="/dashboard/shipments"
            class="text-blue-600 hover:text-blue-700"
          >
            View all shipments
          </NuxtLink>
        </template>
      </StatsCard>

      <StatsCard
        title="Delivered Today"
        :value="stats.deliveredToday"
        icon="i-heroicons-check-circle"
        icon-class="text-green-600"
      >
        <template #footer>
          <span class="text-green-600">
            {{ stats.deliveryRate }}% delivery rate
          </span>
        </template>
      </StatsCard>

      <StatsCard
        title="Pending Pickups"
        :value="stats.pendingPickups"
        icon="i-heroicons-clock"
        icon-class="text-yellow-600"
      >
        <template #footer>
          <NuxtLink
            to="/dashboard/pickups"
            class="text-blue-600 hover:text-blue-700"
          >
            Schedule pickup
          </NuxtLink>
        </template>
      </StatsCard>
    </div>

    <div class="mt-8">
      <ShipmentTable :shipments="recentShipments" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "#build/imports";
import { useShipmentStore } from "@/stores/shipment";
import { storeToRefs } from "pinia";

defineProps({
  layout: { type: String, default: "dashboard" },
  middleware: { type: Array, default: () => ["auth"] },
});

const shipmentStore = useShipmentStore();
const { stats, loading, recentShipments } = storeToRefs(shipmentStore);

onMounted(async () => {
  await Promise.all([
    shipmentStore.fetchStats(),
    shipmentStore.fetchShipments(),
  ]);
});
</script>
