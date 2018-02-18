import * as React from 'react'
import { render } from 'react-dom'
import s from 's-js'
import * as r from 'ramda'

import * as z from 'util/s-js'

import {
  NewCaloriesEntry,
  CaloriesEntries,
  caloriesEntryType as ceT
} from 'flakes/calories'

const entries$ = s.data([
  ceT.create(new Date(), 'foo', 5),
  ceT.create(new Date(), 'bar', 11)
])

const App = () => (
  <React.Fragment>
    <NewCaloriesEntry onAdd={x => z.evolve(r.append(x), entries$)} />
    <CaloriesEntries entries={entries$()} />
  </React.Fragment>
)

s.root(() =>
  s.on([entries$], () => render(<App />, document.getElementById('root')))
)
