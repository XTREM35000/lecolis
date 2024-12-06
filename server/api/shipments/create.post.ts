import { verifyToken } from '../../utils/auth'
import { Shipment } from '../../models/Shipment'
import { createShipmentSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event)
    const body = await readBody(event)
    
    const validatedData = createShipmentSchema.parse(body)
    
    const trackingNumber = `GE${Date.now()}${Math.floor(Math.random() * 1000)}`
    
    const shipment = await Shipment.create({
      ...validatedData,
      sender: user._id,
      trackingNumber,
      status: 'pending'
    })

    return { shipment }
  } catch (error) {
    if (error.errors) {
      throw createError({
        statusCode: 400,
        message: 'Validation error',
        data: error.errors
      })
    }
    throw error
  }
})