import vine from '@vinejs/vine'

/**
 * Validates the registration of user
 */

export const registerUserValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    phone: vine.string().mobile().nullable().optional(),
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    password: vine.string().minLength(8).maxLength(32),
  })
)

/**
 * Validates inputed fields and values for updating a user's data
 */

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      })
      .optional(),
    phone: vine.string().mobile().optional(),
    username: vine
      .string()
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      })
      .optional(),
  })
)

/**
 * Validates user's login details
 */

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)
