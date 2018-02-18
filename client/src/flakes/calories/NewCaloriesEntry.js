import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'

import * as ceT from './calories-entry-type'

const { button } = hh(h)

export const NewCaloriesEntry = props =>
  button(
    { onClick: () => props.onAdd(ceT.create(new Date(), 'new', 6)) },
    'Add entry'
  )
