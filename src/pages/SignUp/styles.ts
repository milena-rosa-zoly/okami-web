import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';
import signUpBackgroundImage from '../../assets/jacob-mejicanos-Fbl6bWYl1IY-unsplash.jpg';
import colors from '../../styles/colors';

export const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  height: 100vh;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  align-items: center;
  animation: ${appearFromRight} 1s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;

  img {
    margin-bottom: 40px;
    width: 400px;
  }

  div {
    margin: 20px 0;
    text-align: center;
    width: 340px;

    form {
      margin: 60px 0;
      text-align: center;
      width: 340px;

      button {
        margin: 24px 0;
      }

      a {
        color: ${colors.light};
        font-size: 18px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, colors.light)};
        }
      }
    }

    > button {
      background: ${colors.light};
      color: ${colors.darkPink};
      margin: -24px 0;
      transition: color 0.2s;

      &:hover {
        background: ${shade(0.1, colors.light)};
      }

      svg {
        color: ${colors.darkPink};
        margin-right: 16px;
      }
    }

    > a {
      align-items: center;
      color: ${colors.light};
      display: flex;
      font-size: 20px;
      justify-content: center;
      margin-top: 48px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, colors.light)};
      }

      svg {
        margin-right: 16px;
      }
    }
  }

  button:first-child {
    margin: 50px;
  }
`;

export const Background = styled.div`
  background: url(${signUpBackgroundImage}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
