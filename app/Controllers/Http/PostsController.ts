import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostType from 'App/Models/PostType'
import PostService from 'App/Services/PostService'
import PostSearchValidator from 'App/Validators/PostSearchValidator'
import Route from '@ioc:Adonis/Core/Route'

export default class PostsController {
  public async index({ view, request }: HttpContextContract) {
    const { pattern, postTypeId, orderBy } = request.qs()
    const postTypes = await PostType.query().orderBy('name')
    const posts = await PostService.getFilteredList({ pattern, postTypeId, orderBy })
    
    return view.render('pages/index', { posts, postTypes })
  }

  public async search({ view, request, response }: HttpContextContract) {
    const data = await request.validate(PostSearchValidator)
    const posts = await PostService.getFilteredList(data)
    const newPath = Route.makeUrl('posts.index', {}, { qs: data })

    response.header('HX-Push-Url', newPath)

    return view.render('components/post-list', { posts })
  }
}
