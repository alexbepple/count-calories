import * as r from 'ramda'
import * as React from 'react'
import hh_ from 'hyperscript-helpers'
const {p} = hh_(React.createElement)

const renderEntry = entry =>
  p({key: entry.id}, r.join(' ')([entry.time.toString(), entry.description, entry.calories]))

export const CaloriesEntries = props => {
  return r.map(renderEntry, props.entries)
}
