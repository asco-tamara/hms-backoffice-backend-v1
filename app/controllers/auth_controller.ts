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

    let token = await User.accessTokens.create(user)

    token = token.toJSON()

    return {
      message: 'User logged in successfully',
      data: { user, accessToken: token.token},
    }
  }

  async me({ auth }: HttpContext) {
    let user = await auth.authenticateUsing(['api'])

    user = user.toJSON()

    return {
      message: `Welcome ${user.firstName} ${user.lastName}`,
      data: { user },
    }
  }
}
