import vine from '@vinejs/vine'

export const clientCreateValidator = vine.compile(
  vine.object({
    name: vine.string(),
    website: vine
      .string()
      .url({
        protocols: ['http', 'https', 'ftp'],
      })
      .activeUrl()
      .optional()
      .nullable(),
  })
)
