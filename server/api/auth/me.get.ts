import { verifyToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event)
    return { user }
  } catch (error) {
    throw error
  }
})