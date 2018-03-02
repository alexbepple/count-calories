import * as r from 'ramda'
import shortid from 'shortid'

import { defineTypeWithProps } from 'util/types'
import * as dt from 'util/datetime'

const t = defineTypeWithProps('id', 'datetime', 'description', 'kcal')
export const { p, l, g, s } = t

export const create = (datetime, desc, calories) => ({
  [p.id]: shortid.generate(),
  [p.datetime]: datetime,
  [p.description]: desc,
  [p.kcal]: calories
})

export const isValid = r.compose(dt.isValid, g.datetime)

export const hasSameId = r.useWith(r.equals, [g.id, g.id])
