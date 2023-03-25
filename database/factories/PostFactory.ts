import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostTypes from 'App/Enums/PostTypes'

export default Factory.define(Post, ({ faker }) => {
  return {
    title: faker.lorem.words(6),
    summary: faker.lorem.lines(2),
    body: faker.lorem.paragraphs(4)
  }
})
.state('article', (post) => post.postTypeId = PostTypes.ARTICLE)
.state('blog', (post) => post.postTypeId = PostTypes.BLOG)
.state('lesson', (post) => post.postTypeId = PostTypes.LESSON)
.build()
