import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'


describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'teste',
        email: 'teste@mail.com',
        password: '123456'
      })
    
    const response = await request(app.server).post('/sessions').send({
      email: 'teste@mail.com',
      password: '123456'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})
