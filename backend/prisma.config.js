import { defineConfig, env } from '@prisma/config'
import { join } from 'node:path'

export default defineConfig({
  schema: join('prisma', 'schema.prisma'),

  migrations: {
    path: join('prisma', 'migrations'),
    seed: 'node prisma/seed.js',
  },

  datasource: {
    url: env('DATABASE_URL'),
  },
})