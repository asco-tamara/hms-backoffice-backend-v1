import vine from '@vinejs/vine'

export const clientStoreValidator = vine.compile(
  vine.object({
    name: vine.string(),
    website: vine
      .string()
      .url({
        protocols: ['http', 'https', 'ftp'],
      })
      // .activeUrl()
      .unique(async (db, value) => {
        const client = await db.from('clients').where('website', value).first()
        return !client
      })
      .optional(),
  })
)

export const clientUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    website: vine
      .string()
      .url({
        protocols: ['http', 'https', 'ftp'],
      })
      // .activeUrl()
      .unique(async (db, value) => {
        const client = await db.from('clients').where('website', value).first()
        return !client
      })
      .optional(),
  })
)
