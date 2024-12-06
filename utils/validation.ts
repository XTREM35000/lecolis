import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required')
})

export const dimensionsSchema = z.object({
  length: z.number().min(0, 'Length must be positive'),
  width: z.number().min(0, 'Width must be positive'),
  height: z.number().min(0, 'Height must be positive'),
  weight: z.number().min(0, 'Weight must be positive')
})

export const recipientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().min(5, 'Phone number is required')
})

export const createShipmentSchema = z.object({
  recipient: recipientSchema.extend({
    address: addressSchema
  }),
  dimensions: dimensionsSchema
})

export type Address = z.infer<typeof addressSchema>
export type Dimensions = z.infer<typeof dimensionsSchema>
export type Recipient = z.infer<typeof recipientSchema>
export type CreateShipmentInput = z.infer<typeof createShipmentSchema>