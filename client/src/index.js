import * as React from 'react'
import { render } from 'react-dom'
import s from 's-js'
import * as r from 'ramda'
import * as _ from 'lodash'
import { ProgressBar } from 'reprogressbars'

import * as z from 'util/s-js'

import * as http from 'flakes/http'
import {
  NewCaloriesEntry,
  CaloriesEntries,
  caloriesEntryType as ceT
} from 'flakes/calories'
import { createRegisteredSignal, getRegisteredSignals } from 'flakes/signals'

const entries$ = createRegisteredSignal([])

const loading$ = createRegisteredSignal(false)

loading$(true)
http
  .get('/entries')
  .then(
    r.map(
      r.evolve({
        [ceT.p.datetime]: x => new Date(x)
      })
    )
  )
  .then(entries$)
  .finally(() => loading$(false))

const persistEntries = http.put(r.__, '/entries')

const persistEntriesDebounced = _.debounce(persistEntries, 500)
s.root(() =>
  s.on(entries$, () => {
    if (!loading$()) persistEntriesDebounced(entries$())
  })
)

const App = () => (
  <React.Fragment>
    <div style={{ position: 'fixed', left: 0, top: 0, width: '100%' }}>
      <ProgressBar isLoading={loading$()} />
    </div>
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
