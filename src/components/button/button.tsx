import React from 'react'

import { Button as BlueprintButton, Intent } from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'

export interface ButtonProps extends React.PropsWithChildren {
  intent?: Intent
  onClick(): void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { intent, children, onClick } = props

  return (
    <BlueprintButton intent={intent} onClick={onClick}>{children}</BlueprintButton>
  )
}
