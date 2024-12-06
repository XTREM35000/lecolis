<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormGroup label="Street Address" required>
        <UInput
          v-model="address.street"
          placeholder="Enter street address"
          :color="hasError('recipient.address.street') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.address.street')" />
      </UFormGroup>
      <UFormGroup label="City" required>
        <UInput
          v-model="address.city"
          placeholder="Enter city"
          :color="hasError('recipient.address.city') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.address.city')" />
      </UFormGroup>
      <UFormGroup label="State/Province" required>
        <UInput
          v-model="address.state"
          placeholder="Enter state or province"
          :color="hasError('recipient.address.state') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.address.state')" />
      </UFormGroup>
      <UFormGroup label="Postal Code" required>
        <UInput
          v-model="address.postalCode"
          placeholder="Enter postal code"
          :color="hasError('recipient.address.postalCode') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.address.postalCode')" />
      </UFormGroup>
      <UFormGroup label="Country" required>
        <UInput
          v-model="address.country"
          placeholder="Enter country"
          :color="hasError('recipient.address.country') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.address.country')" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addressSchema } from '@/utils/validation'
import type { Address } from '@/utils/validation'

const props = defineProps<{
  modelValue: Address
  title?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Address]
}>()

const address = ref({ ...props.modelValue })

const { getError, hasError } = useFormValidation(addressSchema)

const emitUpdate = () => {
  emit('update:modelValue', address.value)
}

watch(() => props.modelValue, (newValue) => {
  address.value = { ...newValue }
}, { deep: true })
</script>