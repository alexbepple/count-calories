import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'
import {Counter} from './Counter'

const s1 = s.data(0)
const s2 = s.data(1)
const App = () => <div>
  <Counter signal={s1} />
  <Counter signal={s2} />
  <Counter signal={s2} />
</div>

s.root(() =>
  render(<App />, document.getElementById('root'))
)
