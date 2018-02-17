import * as r from 'ramda'
import * as React from 'react'

const renderEntry = entry =>
  <p key={entry.id}>{entry.time.toString()} {entry.description} {entry.calories}</p>

export const CaloriesEntries = props => {
  return r.map(renderEntry, props.entries)
}
