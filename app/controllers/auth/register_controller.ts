import User from '#models/user'
import { registerUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)

    const { username, email } = payload

    await User.firstOrCreate({ username, email }, { ...payload })

    return {
      message: 'User successfully registered',
      data: { ...payload },
    }
  }
}
