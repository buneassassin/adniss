import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(1)
      table.boolean('is_active').defaultTo(false)
      table.string('activation_token').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }


  async down() {
    this.schema.dropTable(this.tableName)
  }
}