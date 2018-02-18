import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import s from 's-js'
import * as r from 'ramda'
import { DateTime } from 'luxon'

import * as z from 'util/s-js'
import { defineProps } from 'util/types'
import { autoKey } from 'util/react'
import { dtlInput } from 'util/react-inputs'

import * as ceT from './calories-entry-type'

const { input, button } = hh(h)

const t = { p: defineProps('onAdd') }

const newEntry$ = s.data(ceT.create(new Date(), '', 0))

export const NewCaloriesEntry = props =>
  autoKey([
    dtlInput({
      defaultValue: ceT.g.time(newEntry$()),
      onChange: r.compose(z.evolve(r.__, newEntry$), ceT.s.time)
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
    button(
      {
        disabled: !DateTime.fromJSDate(ceT.g.time(newEntry$())).isValid,
        onClick: () => props[t.p.onAdd](newEntry$())
      },
      'Add'
    )
  ])

NewCaloriesEntry.signal$ = newEntry$
