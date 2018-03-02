import * as r from 'ramda'
import * as React from 'react'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import { DateTime } from 'luxon'

import { defineTypeWithProps } from 'util/types'
import { autoKey, mapWithKey } from 'util/react'
import { derive, evolve } from 'util/s-js'

import * as ceT from './calories-entry-type'
import { EntryEditor } from './EntryEditor'
import { createRegisteredValueSignal } from '../signals'
import { getDate } from 'util/datetime'

const { table, tbody, tr, td, h3, article, small, header } = hh(h)

const t = defineTypeWithProps('entries$')

const editedIds$ = createRegisteredValueSignal([])
const isBeingEdited = ce => r.contains(ceT.g.id(ce), editedIds$())
const startEditing = ce => evolve(r.append(ceT.g.id(ce)), editedIds$)

const formatTime = x =>
  DateTime.fromJSDate(x).toLocaleString(DateTime.TIME_SIMPLE)
const formatDate = x =>
  DateTime.fromJSDate(x).toLocaleString(DateTime.DATE_HUGE)

const formatKcal = r.pipe(r.toString, r.concat(r.__, ' kcal'))

const renderReadOnly = r.juxt([
  r.compose(formatTime, ceT.g.datetime),
  ceT.g.description,
  r.compose(formatKcal, ceT.g.kcal)
])

const createCells = r.pipe(r.map(r.pipe(r.of, td)), autoKey)

const getDatetimeOfList = r.compose(ceT.g.datetime, r.head)

const renderHeaderForListOfEntries = entries => (
  <header className='mb2'>
    <h3 className='mb1'>{formatDate(getDatetimeOfList(entries))}</h3>
    <small>Total: {formatKcal(ceT.sumKcal(entries))}</small>
  </header>
)

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

  const renderEntries = r.pipe(
    r.sortBy(ceT.g.datetime),
    mapWithKey(ceT.g.id, renderEntry),
    r.compose(x => table({ className: 'ml2' }, x), r.of, tbody)
  )

  return r.pipe(
    entries$,
    r.groupBy(r.compose(getDate, ceT.g.datetime)),
    r.values,
    r.sort(r.descend(getDatetimeOfList)),
    r.map(
      r.compose(
        x => article({ className: 'mt3' }, x),
        r.juxt([renderHeaderForListOfEntries, renderEntries])
      )
    ),
    autoKey
  )()
}
