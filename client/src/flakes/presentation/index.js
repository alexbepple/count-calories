import * as React from 'react'
import { ProgressBar } from 'reprogressbars'

export const ProgressBarAtViewportTop = ({ loading }) => (
  <div style={{ position: 'fixed', left: 0, top: 0, width: '100%' }}>
    <ProgressBar isLoading={loading} />
  </div>
)
