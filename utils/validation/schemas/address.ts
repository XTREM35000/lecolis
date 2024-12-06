import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required').max(2, 'Use 2-letter country code'),
  postalCode: z.string().min(1, 'Postal code is required')
})

export type Address = z.infer<typeof addressSchema>