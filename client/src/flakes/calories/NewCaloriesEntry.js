import * as React from 'react'
import s from 's-js'

import { defineProps } from 'util/types'
import { autoKey } from 'util/react'
import { button } from 'util/react-inputs'

import * as ceT from './calories-entry-type'
import { EntryEditor } from './EntryEditor'

const t = { p: defineProps('onAdd') }

const newEntry$ = s.data()
const initNewEntry = () => newEntry$(ceT.create(new Date(), '', 0))
initNewEntry()

export const NewCaloriesEntry = props =>
  autoKey([
    <EntryEditor signal={newEntry$} />,
    button(
      {
        disabled: !ceT.isValid(newEntry$()),
        onClick: () => {
          props[t.p.onAdd](newEntry$())
          initNewEntry()
        }
      },
      'Add'
    )
  ])

NewCaloriesEntry.signal$ = newEntry$
