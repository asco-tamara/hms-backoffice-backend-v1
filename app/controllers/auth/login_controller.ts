import User from '#models/user'
import { loginUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async store({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(email, password)

    let token = await User.accessTokens.create(user)

    token = token.toJSON()

    return {
      message: 'User logged in successfully',
      data: { user, accessToken: token.token},
    }
  }
}
