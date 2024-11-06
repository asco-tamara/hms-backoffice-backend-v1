/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Client from '#models/client'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const RegisterController = () => import('#controllers/auth/register_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('/users/register', [RegisterController, 'store']).as('register.store')
})

router.post('/login', async ({ request }: HttpContext) => {
  const { email, password } = request.only(['email', 'password'])

  const user = await User.verifyCredentials(email, password)

  const token = await User.accessTokens.create(user)

  return {data: {user, token}}
})

router
  .get('/clients', async () => {
    const clients = await Client.all();
    return clients.map((client) => client.toJSON())
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
