import * as r from 'ramda'
import { argsToArray } from 'util/generic'
import { authToken$ } from 'flakes/auth'

const getFullResourceName = r.concat('/api')

const auth = () => ({ Authorization: 'Bearer ' + authToken$() })
const sendJson = {
  contentType: { 'Content-Type': 'application/json' }
}
const headers = r.pipe(
  argsToArray,
  r.mergeAll,
  props => new Headers(props),
  r.objOf('headers')
)

export const get = resource =>
  fetch(getFullResourceName(resource), headers(auth())).then(res => res.json())

export const put = r.curry((data, resource) =>
  fetch(
    getFullResourceName(resource),
    r.merge(
      {
        method: 'PUT',
        body: JSON.stringify(data)
      },
      headers(auth(), sendJson.contentType)
    )
  )
)
