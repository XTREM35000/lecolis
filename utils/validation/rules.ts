import { z } from 'zod'

export const rules = {
  name: {
    min: 2,
    max: 100,
    pattern: /^[a-zA-Z\s'-]+$/
  },
  phone: {
    min: 5,
    max: 20,
    pattern: /^\+?[\d\s-()]+$/
  },
  dimensions: {
    min: 0.1,
    maxLength: 300, // cm
    maxWeight: 70 // kg
  }
} as const

export const createStringRule = (options: {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message?: string
}) => {
  let rule = z.string()

  if (options.required) {
    rule = rule.min(1, options.message || 'This field is required')
  } else {
    rule = rule.optional()
  }

  if (options.min) {
    rule = rule.min(options.min, `Minimum ${options.min} characters required`)
  }

  if (options.max) {
    rule = rule.max(options.max, `Cannot exceed ${options.max} characters`)
  }

  if (options.pattern) {
    rule = rule.regex(options.pattern, options.message || 'Invalid format')
  }

  return rule
}

export const createNumberRule = (options: {
  required?: boolean
  min?: number
  max?: number
  message?: string
}) => {
  let rule = z.number()

  if (options.required) {
    rule = rule.min(0, options.message || 'This field is required')
  }

  if (options.min !== undefined) {
    rule = rule.min(options.min, `Minimum value is ${options.min}`)
  }

  if (options.max !== undefined) {
    rule = rule.max(options.max, `Maximum value is ${options.max}`)
  }

  return rule
}