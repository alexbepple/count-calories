import * as React from 'react'
import { render } from 'react-dom'
import s from 's-js'
import * as r from 'ramda'
import * as _ from 'lodash'
import { ProgressBar } from 'reprogressbars'

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
import { authToken$ } from 'flakes/auth'

const isDevEnv = () => !r.isNil(module.hot)
console.log('Is dev env?', isDevEnv()) // eslint-disable-line

const searchParams = new URLSearchParams(window.location.search.substr(1))
if (searchParams.has('access_token')) {
  authToken$(searchParams.get('access_token'))
  window.history.pushState({}, '', '/')
}

const isAuthed = r.either(isDevEnv, authToken$)
if (!isAuthed()) {
  window.location.assign('/api/login')
}

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

const NotAuthed = () => (
  <div>
    <div style={{ position: 'fixed', left: 0, top: 0, width: '100%' }}>
      <ProgressBar isLoading />
    </div>
    <p>Not authorized. Redirecting to login page …</p>
  </div>
)

const App = () => (isAuthed() ? <Main /> : <NotAuthed />)

s.root(() =>
  s.on(getRegisteredSignals(), () =>
    render(<App />, document.getElementById('root'))
  )
)
