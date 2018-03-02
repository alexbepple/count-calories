import * as r from 'ramda'

export const exceedsLimit = (value, limit = 1000) => r.lt(limit, value)
