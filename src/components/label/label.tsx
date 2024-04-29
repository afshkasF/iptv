import React from 'react'
import cn from 'classnames'

export interface LabelProps extends React.PropsWithChildren {
  text: string
  inline?: boolean
}

export const Label: React.FC<LabelProps> = (props) => {
  const { text, inline, children } = props

  return (
    <label className={cn('bp5-label', { 'bp5-inline': inline })}>
      {text}
      {children}
    </label>
  )
}
