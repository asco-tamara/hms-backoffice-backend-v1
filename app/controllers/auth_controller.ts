import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginUserValidator, registerUserValidator } from '#validators/auth'

export default class AuthController {
  async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)

    const { username, email } = payload

    await User.firstOrCreate({ username, email }, { ...payload })

    return {
      message: 'User successfully registered',
      data: { ...payload },
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(email, password)

    const tokenRecord = await User.accessTokens.create(user)

    const { token } = tokenRecord.toJSON()

    return {
      message: 'User logged in successfully',
      data: { user, accessToken: token },
    }
  }

  async me({ auth }: HttpContext) {
    const userRecord = await auth.authenticateUsing(['api'])

    const user = userRecord.toJSON()

    console.log('user: ', user)

    return {
      message: `Welcome ${user.firstName} ${user.lastName}`,
      data: { user },
    }
  }
}
