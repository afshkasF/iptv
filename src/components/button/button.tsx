import React from 'react'

import { Button as BlueprintButton, Intent } from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'

export interface ButtonProps extends React.PropsWithChildren {
  className?: string
  intent?: Intent
  onClick(): void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, intent, children, onClick } = props

  return (
    <BlueprintButton
      className={className}
      intent={intent}
      onClick={onClick}
    >
      {children}
    </BlueprintButton>
  )
}
