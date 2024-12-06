import { verifyToken } from '../../utils/auth'
import { Shipment } from '../../models/Shipment'

export default defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event)
    const shipments = await Shipment.find({ sender: user._id })
      .sort({ createdAt: -1 })
      .limit(10)

    return { shipments }
  } catch (error) {
    throw error
  }
})