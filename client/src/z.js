import s from 's-js'
import * as r from 'ramda'
import * as re from 'recompose'

const signalLens = r.lens(s => s(), (val, s) => s(val))
export const over = r.over(signalLens)

export const connect = mapOwnProps => re.compose(
  re.lifecycle({
    componentDidMount() {
      s(() => this.setState(mapOwnProps(this.props)))
    }
  }),
  re.mapProps(mapOwnProps)
)
