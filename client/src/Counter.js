import * as React from 'react'
import * as r from 'ramda'
import * as z from './z'

const CounterPresentation = (props) => <div>
  <h2>Count: {props.value}</h2>
  <button onClick={props.onIncrement}>+</button>
</div>

export const Counter = z.connect(own => ({
  value: own.signal(),
  onIncrement: () => z.over(r.inc, own.signal)
}))(CounterPresentation)
