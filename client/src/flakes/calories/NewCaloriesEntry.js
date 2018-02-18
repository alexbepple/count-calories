import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import s from 's-js'
import * as r from 'ramda'

import * as z from 'util/s-js'
import { defineProps } from 'util/types'
import { autoKey } from 'util/react'
import { dtlInput } from 'util/react-inputs'

import * as ceT from './calories-entry-type'

const { input, button } = hh(h)

const t = { p: defineProps('onAdd') }

const newEntry$ = s.data(ceT.create(new Date(), '', 0))
const evolveNewEntry = r.curry((f, val) => z.evolve(f(val), newEntry$))

export const NewCaloriesEntry = props =>
  autoKey([
    dtlInput({
      defaultValue: ceT.g.datetime(newEntry$()),
      onChange: evolveNewEntry(ceT.s.datetime)
    }),
    input({
      type: 'text',
      defaultValue: ceT.g.description(newEntry$()),
      onChange: e => evolveNewEntry(ceT.s.description, e.target.value)
    }),
    input({
      style: { width: '5em' },
      type: 'number',
      defaultValue: ceT.g.kcal(newEntry$()),
      onChange: e =>
        evolveNewEntry(ceT.s.kcal, r.defaultTo(0, e.target.valueAsNumber))
    }),
    button(
      {
        disabled: !ceT.isValid(newEntry$()),
        onClick: () => props[t.p.onAdd](newEntry$())
      },
      'Add'
    )
  ])

NewCaloriesEntry.signal$ = newEntry$
