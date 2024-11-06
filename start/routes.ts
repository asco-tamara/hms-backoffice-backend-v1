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

const ClientsController = () => import('#controllers/clients_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/register', [RegisterController, 'store']).as('register.store')

    router.post('/login', [LoginController, 'store']).as('login.store')
})
  .prefix('/auth')
  .as('auth')

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
