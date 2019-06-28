import reduce from 'lodash/reduce'

export default class GraphQLError extends Error {
  constructor(args) {
    const error = super(args.message)

    error.key = args.extensions.key
    error.category = args.extensions.category
    error.type = undefined
    error.details = undefined

    if (error.category === 'validation') error.type = 'warning'
    if (error.category === 'graphql') error.type = 'error'

    if (error.category === 'validation') {
      error.details = reduce(
        args.extensions.validation,
        (result, value /*key*/) => {
          return value[0]
        },
        ''
      )
    }

    if (Error.captureStackTrace) Error.captureStackTrace(this, GraphQLError)
  }
}
