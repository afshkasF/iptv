import React from 'react'

export interface ButtonProps extends React.PropsWithChildren {
  onClick(): void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props;

  return (
    <button onClick={onClick}>{children}</button>
  )
}
