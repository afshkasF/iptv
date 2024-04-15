import React from 'react'

import { HelloWorld } from 'components/hello-world/hello-world'

export interface AppProps {
}

export const App: React.FC<AppProps> = () => {
  return (
    <HelloWorld/>
  )
}
