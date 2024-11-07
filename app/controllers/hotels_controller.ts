import Hotel from '#models/hotel'
import { hotelStoreValidator, hotelUpdateValidator } from '#validators/hotel';
import type { HttpContext } from '@adonisjs/core/http'

export default class HotelsController {
  async index({ response }: HttpContext) {
    const hotels = await Hotel.all()

    return response.ok(hotels)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(hotelStoreValidator)

    const { name, website } = payload

    await Hotel.firstOrCreate({ name, website }, { ...payload })

    return {
      message: 'Hotel successfully onboarded',
      data: { ...payload },
    }
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(hotelUpdateValidator)
    const hotel = await Hotel.findOrFail(params.id)

    hotel.merge(payload)
    await hotel.save()

    return hotel
  }
}
