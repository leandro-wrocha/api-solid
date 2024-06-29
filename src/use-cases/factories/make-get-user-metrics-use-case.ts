import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRespository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRespository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
