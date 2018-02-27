import * as React from 'react'

import { defineTypeWithProps } from 'util/types'
import { autoKey } from 'util/react'
import { button } from 'util/react-inputs'

import { createRegisteredValueSignal } from 'flakes/signals'

import * as ceT from './calories-entry-type'
import { EntryEditor } from './EntryEditor'

const t = defineTypeWithProps('onAdd')

const newEntry$ = createRegisteredValueSignal()
const initNewEntry = () => newEntry$(ceT.create(new Date(), '', 0))
initNewEntry()

export const NewCaloriesEntry = props =>
  autoKey([
    <EntryEditor signal={newEntry$} />,
    button(
      {
        disabled: !ceT.isValid(newEntry$()),
        onClick: () => {
          t.g.onAdd(props)(newEntry$())
          initNewEntry()
        }
      },
      'Add'
    )
  ])
