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

const renderEntry = ce =>
  tr(
    autoKey(
      r.map(td, [
        formatDateTime(ceT.g.time(ce)),
        ceT.g.description(ce),
        ceT.g.calories(ce)
      ])
    )
  )

export const CaloriesEntries = props =>
  table([tbody(autoKey(r.map(renderEntry, props[t.p.entries])))])
