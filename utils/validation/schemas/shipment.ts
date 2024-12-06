import { z } from 'zod'
import { recipientWithAddressSchema } from './recipient'
import { dimensionsSchema } from './dimensions'

export const createShipmentSchema = z.object({
  recipient: recipientWithAddressSchema,
  dimensions: dimensionsSchema
})

export type CreateShipmentInput = z.infer<typeof createShipmentSchema>