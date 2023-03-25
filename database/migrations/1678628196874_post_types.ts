import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import PostTypes from 'App/Enums/PostTypes'

export default class extends BaseSchema {
  protected tableName = 'post_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([{
        id: PostTypes.ARTICLE,
        name: 'Article'
      }, {
        id: PostTypes.BLOG,
        name: 'Blog'
      }, {
        id: PostTypes.LESSON,
        name: 'Lesson'
      }])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
