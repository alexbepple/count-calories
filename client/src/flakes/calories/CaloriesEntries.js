import * as r from 'ramda'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import { DateTime } from 'luxon'

import { defineProps } from 'util/types'
import { autoKey } from 'util/react'

import * as ceT from './calories-entry-type'

const { table, tbody, tr, td } = hh(h)

const t = { p: defineProps('entries') }

const formatDateTime = x =>
  DateTime.fromJSDate(x).toLocaleString(DateTime.DATETIME_SHORT)

const formatCal = r.pipe(r.toString, r.concat(r.__, ' kcal'))

const renderEntry = r.pipe(
  r.juxt([
    r.compose(formatDateTime, ceT.g.time),
    ceT.g.description,
    r.compose(formatCal, ceT.g.kcal)
  ]),
  r.pipe(r.map(td), autoKey, tr)
)

export const CaloriesEntries = r.pipe(
  r.prop(t.p.entries),
  r.pipe(r.map(renderEntry), autoKey),
  r.compose(table, r.of, tbody)
)
