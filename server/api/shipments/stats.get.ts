import { verifyToken } from '../../utils/auth'
import { Shipment } from '../../models/Shipment'

export default defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [activeShipments, deliveredToday, totalDelivered, pendingPickups] = await Promise.all([
      Shipment.countDocuments({ sender: user._id, status: 'in_transit' }),
      Shipment.countDocuments({
        sender: user._id,
        status: 'delivered',
        updatedAt: { $gte: today }
      }),
      Shipment.countDocuments({ sender: user._id, status: 'delivered' }),
      Shipment.countDocuments({ sender: user._id, status: 'pending' })
    ])

    const totalShipments = await Shipment.countDocuments({ sender: user._id })
    const deliveryRate = totalShipments > 0
      ? Math.round((totalDelivered / totalShipments) * 100)
      : 0

    return {
      activeShipments,
      deliveredToday,
      deliveryRate,
      pendingPickups
    }
  } catch (error) {
    throw error
  }
})