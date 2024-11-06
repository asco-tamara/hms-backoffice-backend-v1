import Client from '#models/client'
import { clientStoreValidator, clientUpdateValidator } from '#validators/client';
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.all();

    return response.ok(clients)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(clientStoreValidator)

    const { name, website } = payload

    await Client.firstOrCreate({ name, website }, { ...payload })

    return {
      message: 'Client successfully onboarded',
      data: { ...payload },
    }
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(clientUpdateValidator)
    const client = await Client.findOrFail(params.id)

    client.merge(payload)
    await client.save()

    return client
  }
}
