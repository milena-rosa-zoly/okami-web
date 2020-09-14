import styled from 'styled-components';
import { shade } from 'polished';
import colors from '../../styles/colors';

export const Wrapper = styled.button`
  align-items: center;
  background: ${colors.darkPink};
  border: 0;
  border-radius: 4px;
  color: ${colors.light};
  display: flex;
  font-weight: bold;
  justify-content: center;
  height: 48px;
  padding: 0 16px;
  transition: background-color 200ms;
  width: 100%;

  &:hover {
    background: ${shade(0.2, colors.darkPink)};
  }
`;
