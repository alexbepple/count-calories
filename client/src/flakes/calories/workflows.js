import * as r from 'ramda'
import * as http from 'flakes/http'

import * as ceT from './calories-entry-type'

const fromJson = r.evolve({
  [ceT.p.datetime]: x => new Date(x)
})

const resource = '/entries'
export const fetchEntries = () => http.get(resource).then(r.map(fromJson))

export const persistEntries = http.put(r.__, resource)
