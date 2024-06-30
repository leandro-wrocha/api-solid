import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
      .post('/users')
      .send({
        name: 'teste',
        email: 'teste@mail.com',
        password: '123456'
      })
    
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'teste@mail.com',
      password: '123456'
    })

    const { token } = authResponse.body

    return {
      token
    }
}
