import styled, { css } from 'styled-components';
import ToolTip from 'components/ToolTip';

import colors from '../../styles/colors';

interface InputContainerProps {
  isInvalid: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

interface WrapperProps {
  hasLabel: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  /* background: ${colors.light}; */
  ${props =>
    props.hasLabel
      ? css`
          display: flex;
          flex-direction: column;
        `
      : css`
          margin: 0;
        `}
`;

export const InputContainer = styled.div<InputContainerProps>`
  align-items: center;
  background: #eee;
  border: 2px solid ${colors.lightGrey};
  border-radius: 4px;
  color: ${colors.mediumGrey};
  display: flex;
  padding: 12px;
  width: 340px;

  ${props =>
    props.isInvalid &&
    css`
      border-color: ${colors.error};
    `};

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.dark};
      color: ${colors.dark};
    `};

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.darkPink};
    `};

  input {
    background: transparent;
    border: 0;
    color: ${colors.darkGrey};
    flex: 1;
    width: 75%;

    &:focus,
    &:invalid {
      box-shadow: none;
    }

    &::placeholder {
      color: ${colors.mediumGrey};
    }
  }

  svg {
    height: 20px;
    margin-right: 16px;
  }
`;

export const Label = styled.label`
  color: ${colors.dark};
  display: flex;
  font-weight: bold;
  padding-bottom: 8px;
`;

export const Error = styled(ToolTip)`
  margin-left: 16px;
  height: 20px;

  svg {
    color: ${colors.error};
    margin: 0;
  }

  /* > span {
    background: ${colors.error};
    color: ${colors.light};

    &::before {
      border-color: ${colors.error} transparent;
    }
  } */
`;
