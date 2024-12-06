import { connectDB } from '../utils/db'

export default defineEventHandler(async (event) => {
  if (event.path?.startsWith('/api/')) {
    await connectDB(event)
  }
})