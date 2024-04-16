import React from 'react'

export interface TextBoxProps {
  value: string;
  onChange(value: string): void;
}

export const TextBox: React.FC<TextBoxProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    onChange(event.currentTarget.value);
  };

  return (
    <input type="text" value={value} onChange={handleChange}></input>
  )
}
