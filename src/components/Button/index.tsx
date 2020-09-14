import React, { ButtonHTMLAttributes } from 'react';

import { Wrapper } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Wrapper type="button" {...rest}>
    {children}
  </Wrapper>
);

export default Button;
