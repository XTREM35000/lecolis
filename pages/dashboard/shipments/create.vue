<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Create New Shipment</h1>
      <UButton
        to="/dashboard/shipments"
        color="gray"
        variant="soft"
        icon="i-heroicons-arrow-left"
      >
        Back to Shipments
      </UButton>
    </div>

    <UCard>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <RecipientForm
          v-model="form.recipient"
        />

        <AddressForm
          v-model="form.recipient.address"
          title="Delivery Address"
        />

        <PackageDimensionsForm
          v-model="form.dimensions"
        />

        <div class="flex justify-end space-x-4">
          <UButton
            type="button"
            color="gray"
            variant="soft"
            :disabled="loading"
            @click="router.back()"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            color="blue"
            :loading="loading"
          >
            Create Shipment
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useShipmentStore } from '@/stores/shipment'
import { createShipmentSchema } from '@/utils/validation'
import type { CreateShipmentInput } from '@/utils/validation'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const router = useRouter()
const shipmentStore = useShipmentStore()
const loading = ref(false)

const form = ref<CreateShipmentInput>({
  recipient: {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    }
  },
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
    weight: 0
  }
})

const { validate } = useFormValidation(createShipmentSchema)

const handleSubmit = async () => {
  if (!validate(form.value)) {
    return
  }

  loading.value = true
  try {
    const success = await shipmentStore.createShipment(form.value)
    if (success) {
      router.push('/dashboard/shipments')
    }
  } finally {
    loading.value = false
  }
}
</script>