import * as r from 'ramda'
import * as React from 'react'
import hh_ from 'hyperscript-helpers'
import { DateTime } from 'luxon'

import { defineProps } from 'util/types'
import { autoKey } from 'util/react'

import * as ceT from './calories-entry-type'

const { table, tbody, tr, td } = hh_(React.createElement)

const t = { p: defineProps('entries') }

const renderEntry = ce =>
  tr(
    {},
    autoKey(
      r.map(val => td({}, val), [
        DateTime.fromJSDate(ceT.g.time(ce)).toLocaleString(
          DateTime.DATETIME_SHORT
        ),
        ceT.g.description(ce),
        ceT.g.calories(ce)
      ])
    )
  )

export const CaloriesEntries = props =>
  table({}, tbody({}, autoKey(r.map(renderEntry, props[t.p.entries]))))
