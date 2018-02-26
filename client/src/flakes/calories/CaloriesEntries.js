import * as r from 'ramda'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import { DateTime } from 'luxon'

import { defineProps } from 'util/types'
import { autoKey, mapWithKey } from 'util/react'
import { derive } from 'util/s-js'

import * as ceT from './calories-entry-type'
import { EntryEditor } from './EntryEditor'

const { table, tbody, tr, td } = hh(h)

const t = { p: defineProps('entries$') }

const formatDateTime = x =>
  DateTime.fromJSDate(x).toLocaleString(DateTime.DATETIME_SHORT)

const formatKcal = r.pipe(r.toString, r.concat(r.__, ' kcal'))

const renderReadOnly = r.juxt([
  r.compose(formatDateTime, ceT.g.datetime),
  ceT.g.description,
  r.compose(formatKcal, ceT.g.kcal)
])

export const CaloriesEntries = props => {
  const entries$ = r.prop(t.p.entries$, props)
  const renderReadWrite = ce =>
    EntryEditor({ signal: derive(ceT.hasSameId(ce), entries$) })

  const renderEntry = r.pipe(
    r.ifElse(
      ce => ceT.g.description(ce) === 'xyz',
      renderReadWrite,
      renderReadOnly
    ),
    r.pipe(r.map(r.pipe(r.of, td)), autoKey, tr)
  )

  return r.pipe(
    entries$,
    mapWithKey(ceT.g.id, renderEntry),
    r.compose(table, r.of, tbody)
  )()
}
