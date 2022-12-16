import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  children: ReactNode,
  fill: string,
  width?: string,
  height?: string,
  hover?: string,
  active?: string,
  clickHandler?: React.MouseEventHandler
}

const IconButton = (props: IconButtonProps) => {
  const {children, ...iconButtonStyles} = props;

  return (
    <IconButtonWrapper {...iconButtonStyles} onClick={props.clickHandler}>
      {children}
    </IconButtonWrapper>
  );
};

const IconButtonWrapper = styled.button<IconButtonProps>`
  svg {
    width: ${(props) => (props.width || 1) + 'rem'};
    height: ${(props) => (props.height || 1) + 'rem'};
    fill: ${(props) => props.fill};
  }
  &:hover {
    svg {
      fill: ${(props) => props.hover || 'black'};
    }
  }
  &.active {
    svg {
      fill: ${(props) => props.active || 'black'};
    }
  }
`; 

export { IconButton };