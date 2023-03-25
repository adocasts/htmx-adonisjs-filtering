import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import PostTypes from 'App/Enums/PostTypes'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_type_id').unsigned().references('id').inTable('post_types').notNullable().defaultTo(PostTypes.ARTICLE)
      table.string('title').notNullable()
      table.string('summary').notNullable().defaultTo('')
      table.text('body').notNullable().defaultTo('')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
