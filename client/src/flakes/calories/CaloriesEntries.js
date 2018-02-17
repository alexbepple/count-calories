import * as r from 'ramda'
import * as React from 'react'
import hh_ from 'hyperscript-helpers'
const { p } = hh_(React.createElement)
import * as ceT from './calories-entry-type'
import { defineProps } from '../../util/types'

const t = { p: defineProps('entries') }

const renderEntry = ce =>
  p(
    { key: ce.id },
    r.join(' ')([
      ceT.g.time(ce).toString(),
      ceT.g.description(ce),
      ceT.g.calories(ce)
    ])
  )

export const CaloriesEntries = props => {
  return r.map(renderEntry, props[t.p.entries])
}
