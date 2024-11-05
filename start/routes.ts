/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/users', async({request}) => {
  const { email, firstName, lastName, phone, username, password } = request.body()
  const user = User.create({ email, firstName, lastName, phone, username, password })

  return {
    message: 'success',
    data: {...user}
  }

})

router.post('/login', async ({ request }: HttpContext) => {
  const { email, password } = request.only(['email', 'password'])

  const user = await User.verifyCredentials(email, password)

  const token = await User.accessTokens.create(user)

  return {data: {user, token}}
})
