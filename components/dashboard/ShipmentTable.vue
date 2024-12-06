<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Recent Shipments</h2>
    <UTable
      :columns="columns"
      :rows="shipments"
      :loading="loading"
    >
      <template #status-data="{ row }">
        <UBadge
          :color="getStatusColor(row.status)"
          variant="subtle"
          size="sm"
        >
          {{ row.status }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import type { Shipment } from '@/stores/shipment'

const props = defineProps<{
  shipments: Shipment[]
  loading: boolean
}>()

const columns = [
  {
    key: 'trackingNumber',
    label: 'Tracking Number'
  },
  {
    key: 'recipient.name',
    label: 'Recipient'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'createdAt',
    label: 'Created At'
  }
]

const getStatusColor = (status: Shipment['status']) => {
  const colors = {
    pending: 'yellow',
    in_transit: 'blue',
    delivered: 'green',
    failed: 'red'
  }
  return colors[status]
}
</script>