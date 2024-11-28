import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    const usersExists = await this.schema.hasTable('users')
    if (!usersExists) {
      throw new Error("La tabla 'users' no existe. Ejecute la migración correspondiente primero.")
    }
  
    const exists = await this.schema.hasTable(this.tableName)
    if (!exists) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table
          .integer('tokenable_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        table.string('type').notNullable()
        table.string('name').nullable()
        table.string('hash').notNullable()
        table.text('abilities').notNullable()
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').nullable()
        table.timestamp('last_used_at').nullable()
        table.timestamp('expires_at').nullable()
      })
    }
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}