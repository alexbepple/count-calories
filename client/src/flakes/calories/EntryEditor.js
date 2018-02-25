import * as r from 'ramda'

import * as z from 'util/s-js'
import { autoKey } from 'util/react'
import { input, dtlInput } from 'util/react-inputs'
import { defineProps } from 'util/types'

import * as ceT from './calories-entry-type'

const t = { p: defineProps('signal') }

export const EntryEditor = props => {
  const entry$ = props[t.p.signal]
  const evolveEntry = r.curry((f, val) => z.evolve(f(val), entry$))
  return autoKey([
    dtlInput({
      value: ceT.g.datetime(entry$()),
      onChange: evolveEntry(ceT.s.datetime)
    }),
    input({
      type: 'text',
      value: ceT.g.description(entry$()),
      onChange: e => evolveEntry(ceT.s.description, e.target.value)
    }),
    input({
      style: { width: '5em' },
      type: 'number',
      value: ceT.g.kcal(entry$()),
      onChange: e =>
        evolveEntry(ceT.s.kcal, r.defaultTo(0, e.target.valueAsNumber))
    })
  ])
}
