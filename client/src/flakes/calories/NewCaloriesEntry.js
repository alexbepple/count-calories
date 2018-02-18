import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'
import s from 's-js'

import * as z from 'util/s-js'
import { defineProps } from 'util/types'
import { autoKey } from 'util/react'

import * as ceT from './calories-entry-type'

const { input, button } = hh(h)

const t = { p: defineProps('onAdd') }

const newEntry$ = s.data(ceT.create(new Date(), 'new', 6))

export const NewCaloriesEntry = props =>
  autoKey([
    input({
      type: 'datetime-local',
      onChange: e => z.evolve(ceT.s.time(e.target.value), newEntry$)
    }),
    input({
      type: 'text',
      onChange: e => z.evolve(ceT.s.description(e.target.value), newEntry$)
    }),
    input({
      type: 'number',
      onChange: e => z.evolve(ceT.s.kcal(e.target.value), newEntry$)
    }),
    button({ onClick: () => props[t.p.onAdd](newEntry$()) }, 'Add')
  ])
