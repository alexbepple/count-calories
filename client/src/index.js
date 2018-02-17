import * as React from 'react'
import { render } from 'react-dom'
import s from 's-js'
import { CaloriesEntries, caloriesEntryType as ceT } from 'flakes/calories'

const entries = [
  ceT.create(new Date(), 'foo', 5),
  ceT.create(new Date(), 'bar', 11)
]

const entries$ = s.data(entries)

const App = () => <CaloriesEntries entries={entries$()} />

s.root(() =>
  s.on([entries$], () => render(<App />, document.getElementById('root')))
)
