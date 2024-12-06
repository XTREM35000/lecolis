import { z } from 'zod'
import { toast } from 'vue3-toastify'

export interface ValidationError {
  path: string[]
  message: string
}

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: ValidationError[]
}

export function useFormValidation<T extends z.ZodType>(schema: T) {
  const errors = ref<Record<string, string>>({})
  const isValid = ref(true)
  
  const validate = (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data)
      errors.value = {}
      isValid.value = true
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value = error.errors.reduce((acc, curr) => {
          const path = curr.path.join('.')
          acc[path] = curr.message
          return acc
        }, {} as Record<string, string>)
        
        isValid.value = false
        // Show first error in toast
        toast.error(Object.values(errors.value)[0])
      }
      return false
    }
  }

  const validateField = (field: string, value: unknown) => {
    const fieldSchema = schema.shape[field]
    if (!fieldSchema) return true

    try {
      fieldSchema.parse(value)
      delete errors.value[field]
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value[field] = error.errors[0].message
      }
      return false
    }
  }

  const getError = (path: string) => errors.value[path]
  const hasError = (path: string) => !!errors.value[path]
  const clearErrors = () => {
    errors.value = {}
    isValid.value = true
  }

  return {
    errors,
    isValid,
    validate,
    validateField,
    getError,
    hasError,
    clearErrors
  }
}