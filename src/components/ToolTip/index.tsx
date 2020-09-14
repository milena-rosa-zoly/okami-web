import React from 'react';
import { Wrapper } from './styles';

interface ToolTipProps {
  title: string;
  className?: string;
}

const ToolTip: React.FC<ToolTipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Wrapper className={className}>
      {children}
      <span>{title}</span>
    </Wrapper>
  );
};

export default ToolTip;
