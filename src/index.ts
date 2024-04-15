import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from 'components/app/app'

window.onload = (): void => {
  const container = document.getElementById('root')
  if (!container) {
    console.error('Container couldn\'t be found')
    return
  }
  const root = ReactDOM.createRoot(container)
  root.render(React.createElement(App))
}
