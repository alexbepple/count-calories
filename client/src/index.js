// #region imports
import * as React from 'react'
import Headroom from 'react-headroom'
import { render } from 'react-dom'
import s from 's-js'
import * as r from 'ramda'
import * as _ from 'lodash'

import 'normalize.css'
import 'basscss/css/basscss.min.css'
import 'colors.css/css/colors.min.css'
import './index.css'

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
import {
  DailyLimitEditor,
  refreshDailyLimit,
  dailyLimit$,
  persistDailyLimit
} from 'flakes/daily-limit'
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
const autoPersistDailyLimit = () => {
  const persistDailyLimitDebounced = _.debounce(persistDailyLimit, 500)
  z.onChanges(dailyLimit$, () => {
    if (!loading$()) persistDailyLimitDebounced(dailyLimit$())
  })
}
s.root(() => {
  autoPersistEntries()
  autoPersistDailyLimit()
})

if (isAuthed()) {
  loading$(true)
  Promise.all([fetchEntries().then(entries$), refreshDailyLimit()]).finally(
    () => loading$(false)
  )
}

const grid = {
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gridTemplateAreas: '"main aside"'
}

const Main = () => (
  <React.Fragment>
    <ProgressBarAtViewportTop loading={loading$()} />
    <Headroom>
      <h1 className='m0 py2 px3 bg-navy silver'>Count calories</h1>
    </Headroom>
    <div style={grid}>
      <aside style={{ gridArea: 'aside' }} className='bg-silver pl2'>
        <h2>Daily Limit</h2>
        <DailyLimitEditor />
      </aside>
      <main className='mx3 my2' style={{ gridArea: 'main' }}>
        <section>
          <h2>Add Entry</h2>
          <NewCaloriesEntry onAdd={x => z.evolve(r.append(x), entries$)} />
        </section>
        <section className='mt4'>
          <h2>Entries</h2>
          <CaloriesEntries entries$={entries$} />
        </section>
      </main>
    </div>
  </React.Fragment>
)

const App = () => (isAuthed() ? <Main /> : <NotAuthed />)

s.root(() =>
  s.on(getRegisteredSignals(), () =>
    render(<App />, document.getElementById('root'))
  )
)
