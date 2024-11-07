/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])

    router.post('/login', [AuthController, 'login'])

    router.get('/me', [AuthController, 'me'])

    router.get('/logout', [AuthController, 'logout'])
})
  .prefix('/auth')

router
  .group(() => {
    router.get('/', [ClientsController, 'index']).as('clients.index')

    router.post('/store', [ClientsController, 'store']).as('clients.store')

    router.put('/update/:id', [ClientsController, 'update']).as('clients.update')
  })
  .prefix('/clients')
  .as('clients')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
