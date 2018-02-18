import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import s from 's-js'
import * as r from 'ramda'
import { DateTime } from 'luxon'

import * as z from 'util/s-js'
import { defineProps } from 'util/types'
import { autoKey } from 'util/react'

import * as ceT from './calories-entry-type'

const { input, button } = hh(h)

const t = { p: defineProps('onAdd') }

const newEntry$ = s.data(ceT.create(new Date(), '', 0))

const dateTimeLocal = {
  toValue: x => DateTime.fromJSDate(x).toFormat("yyyy-MM-dd'T'HH:mm"),
  getDateFromChangeEvent: e => new Date(e.target.valueAsNumber)
}

export const NewCaloriesEntry = props =>
  autoKey([
    input({
      type: 'datetime-local',
      defaultValue: r.compose(dateTimeLocal.toValue, ceT.g.time, newEntry$)(),
      onChange: e =>
        z.evolve(ceT.s.time(dateTimeLocal.getDateFromChangeEvent(e)), newEntry$)
    }),
    input({
      type: 'text',
      defaultValue: ceT.g.description(newEntry$()),
      onChange: e => z.evolve(ceT.s.description(e.target.value), newEntry$)
    }),
    input({
      style: { width: '5em' },
      type: 'number',
      defaultValue: ceT.g.kcal(newEntry$()),
      onChange: e =>
        z.evolve(ceT.s.kcal(r.defaultTo(0, e.target.valueAsNumber)), newEntry$)
    }),
    button({ onClick: () => props[t.p.onAdd](newEntry$()) }, 'Add')
  ])
