import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGyms } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGyms

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymsRepository)

    // await gymsRepository.create({
    //   id: 'gym-01',
    //   title: 'teste javascript',
    //   description: 'javascript',
    //   latitude: -27.0747279,
    //   longitude: -49.4889672,
    //   phone: null,
    // })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Java Gym',
      description: null,
      phone: null,
      latitude: -27.2090052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Type Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2090052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Java Gym' })])
  })

  it.skip('should be able to fecth paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Type Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2090052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      userLatitude: -27.2090052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Type Gym 21' }),
      expect.objectContaining({ title: 'Type Gym 22' }),
    ])
  })
})
