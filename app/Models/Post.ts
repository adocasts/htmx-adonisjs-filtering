import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import PostType from './PostType'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public postTypeId: number

  @column()
  public title: string

  @column()
  public summary: string

  @column()
  public body: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => PostType)
  public postType: BelongsTo<typeof PostType>
}
