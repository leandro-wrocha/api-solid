import { Environment } from 'vitest'

export default<Environment> {
  name: 'prisma-environment',
  transformMode: 'ssr',
  async setup() {
    return {
      async teardown() {},
    }
  },
}