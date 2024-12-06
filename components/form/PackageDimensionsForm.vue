<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Package Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UFormGroup label="Length (cm)" required>
        <UInput
          v-model.number="dimensions.length"
          type="number"
          min="0"
          step="0.1"
          :color="hasError('dimensions.length') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('dimensions.length')" />
      </UFormGroup>
      <UFormGroup label="Width (cm)" required>
        <UInput
          v-model.number="dimensions.width"
          type="number"
          min="0"
          step="0.1"
          :color="hasError('dimensions.width') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('dimensions.width')" />
      </UFormGroup>
      <UFormGroup label="Height (cm)" required>
        <UInput
          v-model.number="dimensions.height"
          type="number"
          min="0"
          step="0.1"
          :color="hasError('dimensions.height') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('dimensions.height')" />
      </UFormGroup>
      <UFormGroup label="Weight (kg)" required>
        <UInput
          v-model.number="dimensions.weight"
          type="number"
          min="0"
          step="0.1"
          :color="hasError('dimensions.weight') ? 'red' : undefined"
          @update:model-value="emitUpdate"
        />
        <FormError :error="getError('dimensions.weight')" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dimensionsSchema } from '@/utils/validation'
import type { Dimensions } from '@/utils/validation'

const props = defineProps<{
  modelValue: Dimensions
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Dimensions]
}>()

const dimensions = ref({ ...props.modelValue })

const { getError, hasError } = useFormValidation(dimensionsSchema)

const emitUpdate = () => {
  emit('update:modelValue', dimensions.value)
}

watch(() => props.modelValue, (newValue) => {
  dimensions.value = { ...newValue }
}, { deep: true })
</script>