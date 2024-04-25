import React from 'react'

import '@blueprintjs/core/lib/css/blueprint.css'

export interface TextBoxProps {
  value: string
  onChange(value: string): void
}

export const TextBox: React.FC<TextBoxProps> = (props) => {
  const { value, onChange } = props

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    onChange(event.currentTarget.value)
  }

  return (
    <input type="text" className='bp5-input' value={value} onChange={handleChange}></input>
  )
}
