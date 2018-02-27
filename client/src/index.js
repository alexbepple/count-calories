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
import { createRegisteredSignal, getRegisteredSignals } from 'flakes/signals'

const entries$ = createRegisteredSignal([])

fetch('/api')
  .then(res => res.json())
  .then(
    r.map(
      r.evolve({
        [ceT.p.datetime]: x => new Date(x)
      })
    )
  )
  .then(entries$)

const App = () => (
  <React.Fragment>
    <section>
      <h2>Add Entry</h2>
      <NewCaloriesEntry onAdd={x => z.evolve(r.append(x), entries$)} />
    </section>
    <section>
      <h2>Entries</h2>
      <CaloriesEntries entries$={entries$} />
    </section>
  </React.Fragment>
)

s.root(() =>
  s.on(getRegisteredSignals(), () =>
    render(<App />, document.getElementById('root'))
  )
)
