import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'
import {CaloriesEntries} from './flakes/calories/CaloriesEntries'

const entries = [
  {
    id: 1,
    time: new Date(),
    description: 'foo',
    calories: 5
  },
  {
    id: 2,
    time: new Date(),
    description: 'bar',
    calories: 11
  }
]

const entries$ = s.data(entries)

const App = () => <div>
  <CaloriesEntries entries={entries$()} />
</div>

s.root(() => s.on(
  [entries$],
  () => render(<App />, document.getElementById('root'))
))
