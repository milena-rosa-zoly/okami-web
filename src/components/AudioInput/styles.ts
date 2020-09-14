import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import colors from '../../styles/colors';

interface UploadProps {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
  [key: string]: any;
  type?: 'error' | 'success' | 'default';
}

const messageColors = {
  error: colors.error,
  success: colors.success,
  default: colors.darkPink,
};

export const Wrapper = styled.div`
  align-items: center;
  background: #eee;
  border: 2px dotted ${colors.lightGrey};
  border-radius: 4px;
  color: ${colors.darkPink};
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: center;
  margin-top: 20px;
  padding: 16px;
  text-align: center;
  width: 100%;

  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragActive &&
    css`
      border-color: ${colors.success};
    `}

  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragReject &&
    css`
      border-color: ${colors.error};
    `}

  input {
    background: transparent;
    border: 0;
    color: ${colors.darkGrey};
    flex: 1;

    &:focus,
    &:invalid {
      box-shadow: none;
    }

    &::placeholder {
      color: ${colors.mediumGrey};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const UploadMessage = styled.p`
  align-items: center;
  color: ${({ type }: UploadProps) => messageColors[type || 'default']};
  display: flex;
  font-size: 16px;
  justify-content: center;
  line-height: 24px;
  padding: 48px 0;
`;
