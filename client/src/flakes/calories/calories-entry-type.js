import * as r from 'ramda'
import shortid from 'shortid'

import { defineProps } from 'util/types'
import * as dt from 'util/datetime'

export const p = defineProps('id', 'datetime', 'description', 'kcal')
export const l = r.map(r.lensProp, p)
export const g = r.map(r.view, l)
export const s = r.map(r.set, l)

export const create = (time, desc, calories) => ({
  [p.id]: shortid.generate(),
  [p.datetime]: time,
  [p.description]: desc,
  [p.kcal]: calories
})

export const isValid = r.compose(dt.isValid, g.datetime)
