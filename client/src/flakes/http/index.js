import * as r from 'ramda'
import { authToken$ } from 'flakes/auth'

const getFullResourceName = r.concat('/api')

export const get = resource =>
  fetch(getFullResourceName(resource), {
    headers: new Headers({
      Authorization: 'Bearer ' + authToken$()
    })
  }).then(res => res.json())

export const put = r.curry((data, resource) =>
  fetch(getFullResourceName(resource), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authToken$()
    })
  })
)
