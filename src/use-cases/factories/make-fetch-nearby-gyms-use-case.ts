import { PrismaGymsRepository } from '@/repositories/prisma/primsa-gyms-repository'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGyms(gymsRepository)

  return useCase
}
