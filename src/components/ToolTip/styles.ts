import styled from 'styled-components';

import colors from '../../styles/colors';

export const Wrapper = styled.div`
  position: relative;

  span {
    /* !TODO colors */
    background: ${colors.darkestPink};
    border-radius: 4px;
    bottom: calc(100% + 12px);
    color: ${colors.light};
    font-size: 14px;
    font-weight: 500;
    left: 50%;
    opacity: 0;
    padding: 8px;
    position: absolute;
    transform: translateX(-50%);
    visibility: hidden;
    transition: visibility 0s 0.4s, opacity 0.4s linear;
    width: 160px;

    &::before {
      border-color: ${colors.darkestPink} transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      content: '';
      left: 50%;
      position: absolute;
      top: 100%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    transition: opacity 0.4s linear;
    visibility: visible;
  }
`;
