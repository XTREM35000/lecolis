import bcrypt from 'bcryptjs'
import { User } from '../../models/User'
import { registerSchema } from '../../utils/validation'
import { generateToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = registerSchema.parse(body)

    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }

    const user = await User.create(validatedData)
    const token = generateToken(user._id.toString())

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
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