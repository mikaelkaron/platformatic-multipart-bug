/// <reference types="@fastify/swagger" />

import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import fp from 'fastify-plugin'
import multipart from '@fastify/multipart'

const routes: FastifyPluginAsyncJsonSchemaToTs<{}> = async (fastify) => {
  await fastify.register(multipart)

  const hasCTP = fastify.hasContentTypeParser('multipart/form-data')
  console.warn(hasCTP)

  fastify
    .route({
      url: '/test',
      method: 'POST',
      schema: {
        consumes: ['multipart/form-data'],
        tags: ['files'],
        summary: 'Write file.',
        description: 'Write file'
      } as const,
      handler: async (request) => {
        const data = await request.file()
        if (!data) {
          throw new Error('No file')
        }

        return data.file
      }
    })
}

export default fp(routes, {
  name: 'file/routes/file',
  encapsulate: true,
})
