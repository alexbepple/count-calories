import * as r from 'ramda'
import * as React from 'react'

import { createRegisteredValueSignal } from 'flakes/signals'
import { ProgressBarAtViewportTop } from 'flakes/presentation'

export const authToken$ = createRegisteredValueSignal()

const isDevEnv = () => !r.isNil(module.hot)
export const isAuthed = r.either(isDevEnv, authToken$)

const extractTokenFromQueryString = () => {
  const searchParams = new URLSearchParams(window.location.search.substr(1))
  if (searchParams.has('access_token')) {
    authToken$(searchParams.get('access_token'))
    window.history.pushState({}, '', '/')
  }
}

export const auth = () => {
  extractTokenFromQueryString()
  if (!isAuthed()) {
    window.location.assign('/api/login')
  }
}

export const NotAuthed = () => (
  <React.Fragment>
    <ProgressBarAtViewportTop loading />
    <p>Not authorized. Redirecting to login page …</p>
  </React.Fragment>
)
