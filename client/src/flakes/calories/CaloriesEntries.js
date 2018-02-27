import * as r from 'ramda'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import { DateTime } from 'luxon'

import { defineTypeWithProps } from 'util/types'
import { autoKey, mapWithKey } from 'util/react'
import { derive, evolve } from 'util/s-js'

import * as ceT from './calories-entry-type'
import { EntryEditor } from './EntryEditor'
import { createRegisteredValueSignal } from '../signals'

const { table, tbody, tr, td } = hh(h)

const t = defineTypeWithProps('entries$')

const editedIds$ = createRegisteredValueSignal([])
const isBeingEdited = ce => r.contains(ceT.g.id(ce), editedIds$())
const startEditing = ce => evolve(r.append(ceT.g.id(ce)), editedIds$)

const formatDateTime = x =>
  DateTime.fromJSDate(x).toLocaleString(DateTime.DATETIME_SHORT)

const formatKcal = r.pipe(r.toString, r.concat(r.__, ' kcal'))

const renderReadOnly = r.juxt([
  r.compose(formatDateTime, ceT.g.datetime),
  ceT.g.description,
  r.compose(formatKcal, ceT.g.kcal)
])

const createCells = r.pipe(r.map(r.pipe(r.of, td)), autoKey)

export const CaloriesEntries = props => {
  const entries$ = t.g.entries$(props)
  const renderReadWrite = ce =>
    EntryEditor({ signal: derive(ceT.hasSameId(ce), entries$) })

  const renderEntry = ce =>
    r.pipe(
      () => ce,
      r.ifElse(isBeingEdited, renderReadWrite, renderReadOnly),
      createCells,
      cells =>
        tr(
          { style: { cursor: 'pointer' }, onClick: () => startEditing(ce) },
          cells
        )
    )()

  return r.pipe(
    entries$,
    mapWithKey(ceT.g.id, renderEntry),
    r.compose(table, r.of, tbody)
  )()
}
