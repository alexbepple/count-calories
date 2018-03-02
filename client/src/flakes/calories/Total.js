import * as r from 'ramda'
import * as React from 'react'

import { exceedsLimit } from 'flakes/daily-limit'

import { formatKcal } from './format'

const getColorInRelationToLimit = r.ifElse(
  exceedsLimit,
  () => 'red',
  () => 'green'
)
export const total = val => (
  <small className={getColorInRelationToLimit(val)}>
    Total: {formatKcal(val)}
  </small>
)
