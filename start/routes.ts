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
const HotelsController = () => import('#controllers/hotels_controller')

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

    router.post('/logout', [AuthController, 'logout'])
})
  .prefix('/auth')

router
  .group(() => {
    router.get('/', [HotelsController, 'index']).as('hotels.index')

    router.post('/store', [HotelsController, 'store']).as('hotels.store')

    router.put('/update/:id', [HotelsController, 'update']).as('hotels.update')
  })
  .prefix('/hotels')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
