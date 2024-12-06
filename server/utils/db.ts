import mongoose from 'mongoose'
import { H3Event } from 'h3'

export async function connectDB(event: H3Event) {
  const config = useRuntimeConfig()
  
  if (mongoose.connection.readyState === 1) {
    return
  }

  try {
    await mongoose.connect(config.mongodbUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw createError({
      statusCode: 500,
      message: 'Database connection failed'
    })
  }
}

export async function closeDB() {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('MongoDB disconnection error:', error)
  }
}