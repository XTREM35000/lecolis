<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Recipient Information</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormGroup label="Full Name" required>
        <UInput
          v-model="recipient.name"
          placeholder="Enter recipient's full name"
          :color="hasError('recipient.name') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.name')" />
      </UFormGroup>
      <UFormGroup label="Email">
        <UInput
          v-model="recipient.email"
          type="email"
          placeholder="Enter recipient's email"
          :color="hasError('recipient.email') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.email')" />
      </UFormGroup>
      <UFormGroup label="Phone Number" required>
        <UInput
          v-model="recipient.phone"
          placeholder="Enter recipient's phone number"
          :color="hasError('recipient.phone') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('recipient.phone')" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recipientSchema } from '@/utils/validation'
import type { Recipient } from '@/utils/validation'

const props = defineProps<{
  modelValue: Recipient
  errors?: Record<string, string>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Recipient]
}>()

const recipient = ref({ ...props.modelValue })

const { getError, hasError } = useFormValidation(recipientSchema)

const emitUpdate = () => {
  emit('update:modelValue', recipient.value)
}

watch(() => props.modelValue, (newValue) => {
  recipient.value = { ...newValue }
}, { deep: true })
</script>