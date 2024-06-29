import { FastifyInstance } from 'fastify'

import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

/**
 * JWT: JSON Web Token
 * Usuário faz login, envia e-mail/senha, o back-end cria um token único, não modificável e STATELESS
 *
 * Stateless: Não armazenado em nenhuma estrutura de persistência de dados (banco de dados)
 *
 * Back-end: Quando vai criar o token ele usa uma PALAVRA-CHAVE (string)
 *
 * Palavra-chave: soakdpsoadkasodksadpoaskd
 *
 * E-mail/senha -> header.payload.sign
 *
 * Login => JWT
 *
 * JWT => Todas requisições dali pra frente
 * Header(cabeçalho): Authorization: Bearer JWT
 */

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
