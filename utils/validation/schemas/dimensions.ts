import { z } from 'zod'

export const dimensionsSchema = z.object({
  length: z.number().min(0.1, 'Length must be greater than 0').max(300, 'Length cannot exceed 300cm'),
  width: z.number().min(0.1, 'Width must be greater than 0').max(300, 'Width cannot exceed 300cm'),
  height: z.number().min(0.1, 'Height must be greater than 0').max(300, 'Height cannot exceed 300cm'),
  weight: z.number().min(0.1, 'Weight must be greater than 0').max(70, 'Weight cannot exceed 70kg')
})

export type Dimensions = z.infer<typeof dimensionsSchema>