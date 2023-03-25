import Post from "App/Models/Post";
import PostSearchValidator from "App/Validators/PostSearchValidator";

export default class PostService {
  public static async getFilteredList({ pattern, postTypeId, orderBy }: PostSearchValidator['schema']['props']) {
    return Post.query()
      .if(pattern, query => query.whereILike('title', `%${pattern}%`))
      .if(postTypeId, query => query.where({ postTypeId }))
      .if(orderBy, query => {
        const [key, direction] = orderBy.split('_') as [string, 'desc' | 'asc']
        query.orderBy(key, direction)
      })
      .preload('postType')
      .orderBy('title')
  }
}