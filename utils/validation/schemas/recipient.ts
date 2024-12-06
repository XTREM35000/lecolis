import { z } from 'zod'
import { addressSchema } from './address'

export const recipientSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens and apostrophes'),
  email: z.string()
    .email('Invalid email format')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .min(5, 'Phone number is required')
    .max(20, 'Phone number is too long')
    .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format')
})

export const recipientWithAddressSchema = recipientSchema.extend({
  address: addressSchema
})

export type Recipient = z.infer<typeof recipientSchema>
export type RecipientWithAddress = z.infer<typeof recipientWithAddressSchema>