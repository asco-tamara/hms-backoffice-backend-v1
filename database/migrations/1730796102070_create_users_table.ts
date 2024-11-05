import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('first_name', 50)
      table.string('last_name', 50)
      table.string('phone', 20).nullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable().defaultTo(this.now(6))
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}