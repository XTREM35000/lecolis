import { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../models/User'
import { loginSchema, registerSchema } from '../../utils/validation'
import { generateToken } from '../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  const path = event.path
  const method = event.method

  if (path === '/api/auth/register' && method === 'POST') {
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
  }

  if (path === '/api/auth/login' && method === 'POST') {
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
  }

  throw createError({
    statusCode: 404,
    message: 'Route not found'
  })
})