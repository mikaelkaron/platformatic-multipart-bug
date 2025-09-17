export default function (fastify, opts, next) {
  fastify.addContentTypeParser('multipart/form-data', function (req, body, done) {
    done(null, body)
  })
  next()
}
