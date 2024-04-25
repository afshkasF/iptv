import React from 'react'

import { Button as BlueprintButton } from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'

export interface ButtonProps extends React.PropsWithChildren {
  onClick(): void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props

  return (
    <BlueprintButton onClick={onClick}>{children}</BlueprintButton>
  )
}
