import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/primsa-gyms-repository'
import { PrismaCheckInsRespository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRespository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
