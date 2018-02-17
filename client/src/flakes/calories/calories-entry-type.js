import {defineProps} from '../../util/types'
import * as r from 'ramda'
import shortid from 'shortid'

export const p = defineProps('id', 'time', 'description', 'calories')
export const l = r.map(r.lensProp, p)
export const g = r.map(r.view, l)

export const create = (time, desc, calories) => ({
  [p.id]: shortid.generate(),
  [p.time]: time,
  [p.description]: desc,
  [p.calories]: calories
})
