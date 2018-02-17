import * as r from 'ramda'
import * as React from 'react'
import hh_ from 'hyperscript-helpers'
const {p} = hh_(React.createElement)
import * as ceT from './calories-entry-type'
import {defineProps} from '../../util/types'

const t = {p: defineProps('entries')}

const renderEntry = entry =>
  p({key: entry.id}, r.join(' ')([entry.time.toString(), entry.description, entry.calories]))

export const CaloriesEntries = props => {
  return r.map(renderEntry, props[t.p.entries])
}
