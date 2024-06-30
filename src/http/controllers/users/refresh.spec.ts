import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'


describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token ', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error('Cookie is empty.')
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
