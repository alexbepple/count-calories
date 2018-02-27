import * as r from 'ramda'

const getFullResourceName = r.concat('/api')

export const get = resource =>
  fetch(getFullResourceName(resource)).then(res => res.json())

export const put = r.curry((data, resource) =>
  fetch(getFullResourceName(resource), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
)
