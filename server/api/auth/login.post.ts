import bcrypt from 'bcryptjs'
import { User } from '../../models/User'
import { loginSchema } from '../../utils/validation'
import { generateToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = loginSchema.parse(body)

    const user = await User.findOne({ email: validatedData.email })
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    const isValidPassword = await bcrypt.compare(validatedData.password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

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