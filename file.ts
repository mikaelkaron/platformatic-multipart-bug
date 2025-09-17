/// <reference types="@fastify/swagger" />

import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import fp from 'fastify-plugin'
import type { FastifyJSONSchema } from 'shared/types'
import multipart from '@fastify/multipart'

const routes: FastifyPluginAsyncJsonSchemaToTs<{}> = async (fastify) => {
  const { fileStorage } = fastify

  await fastify.register(multipart)

  const hasCTP = fastify.hasContentTypeParser('multipart/form-data')
  console.warn(hasCTP)

  fastify
    .route({
      url: '/read',
      method: 'POST',
      schema: {
        tags: ['files'],
        summary: 'Read file.',
        description: 'Read file'
      } as const satisfies FastifyJSONSchema,
      handler: async () => {
        return fileStorage.read('test.txt')
      }
    })
    .route({
      url: '/write',
      method: 'POST',
      schema: {
        tags: ['files'],
        summary: 'Write file.',
        description: 'Write file'
      } as const satisfies FastifyJSONSchema,
      handler: async () => {
        return fileStorage.write('test.txt', 'hello')
      }
    })
}

export default fp(routes, {
  name: 'file/routes/file',
  encapsulate: true,
  decorators: {
    fastify: ['fileStorage']
  }
})
