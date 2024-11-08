import vine from '@vinejs/vine'

export const hotelStoreValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('hotels').where('email', value).first()
        return !user
      }),
    website: vine
      .string()
      .url({
        protocols: ['http', 'https', 'ftp'],
      })
      // .activeUrl()
      .unique(async (db, value) => {
        const hotel = await db.from('hotels').where('website', value).first()
        return !hotel
      }),
  })
)

export const hotelUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('hotels').where('email', value).first()
        return !user
      })
      .optional(),
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
