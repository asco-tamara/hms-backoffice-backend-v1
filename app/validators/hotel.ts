import vine from '@vinejs/vine'

export const hotelStoreValidator = vine.compile(
  vine.object({
    name: vine.string(),
    website: vine
      .string()
      .url({
        protocols: ['http', 'https', 'ftp'],
      })
      // .activeUrl()
      .unique(async (db, value) => {
        const hotel = await db.from('hotels').where('website', value).first()
        return !hotel
      })
      .optional(),
  })
)

export const hotelUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    website: vine
      .string()
      .url({
        protocols: ['http', 'https', 'ftp'],
      })
      // .activeUrl()
      .unique(async (db, value) => {
        const hotel = await db.from('hotels').where('website', value).first()
        return !hotel
      })
      .optional(),
  })
)
