// #region imports
import * as React from 'react'
import { render } from 'react-dom'
import s from 's-js'
import * as r from 'ramda'
import * as _ from 'lodash'
import 'normalize.css'

import * as z from 'util/s-js'

import {
  NewCaloriesEntry,
  CaloriesEntries,
  fetchEntries,
  persistEntries
} from 'flakes/calories'
import {
  createRegisteredValueSignal,
  getRegisteredSignals
} from 'flakes/signals'
import { auth, isAuthed, NotAuthed } from 'flakes/auth'
import { ProgressBarAtViewportTop } from 'flakes/presentation'
// #endregion

auth()

const entries$ = createRegisteredValueSignal([])
const loading$ = createRegisteredValueSignal(false)

const autoPersistEntries = () => {
  const persistEntriesDebounced = _.debounce(persistEntries, 500)
  z.onChanges(entries$, () => {
    if (!loading$()) persistEntriesDebounced(entries$())
  })
}
s.root(() => autoPersistEntries())

if (isAuthed()) {
  loading$(true)
  fetchEntries()
    .then(entries$)
    .finally(() => loading$(false))
}

const Main = () => (
  <React.Fragment>
    <ProgressBarAtViewportTop loading={loading$()} />
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

const App = () => (isAuthed() ? <Main /> : <NotAuthed />)

s.root(() =>
  s.on(getRegisteredSignals(), () =>
    render(<App />, document.getElementById('root'))
  )
)
