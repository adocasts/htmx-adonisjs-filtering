import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PostFactory from 'Database/factories/PostFactory'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await PostFactory.apply('article').createMany(100)
    await PostFactory.apply('blog').createMany(100)
    await PostFactory.apply('lesson').createMany(100)
  }
}
