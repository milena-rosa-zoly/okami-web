import styled from 'styled-components';
import { shade } from 'polished';

import colors from '../../styles/colors';

export const Wrapper = styled.div`
  background: ${colors.dark};
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px auto;
  max-width: 800px;
  width: 100%;
`;

export const AddAudioButton = styled.button`
  align-items: center;
  align-self: flex-end;
  background: ${colors.light};
  /* background: transparent; */
  border: 0;
  border-radius: 50%;
  color: ${colors.dark};
  display: flex;
  height: 32px;
  justify-content: center;
  width: 32px;

  &:hover {
    background: ${colors.darkPink};
  }
`;

export const AudioFileContainer = styled.section`
  align-items: center;
  background: ${colors.dark};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding: 48px;

  button {
    align-items: center;
    background: ${colors.darkPink};
    border: 0;
    border-radius: 5px;
    color: ${colors.light};
    display: flex;
    font-weight: bold;
    height: 40px;
    justify-content: center;
    transition: background 0.3s;
    width: 150px;

    &:hover {
      background: ${shade(0.2, colors.darkPink)};
    }

    svg {
      margin-right: 10px;
    }
  }

  div {
    display: none;
  }
`;

export const Transcriptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  max-width: 700px;
`;

export const Transcription = styled.div`
  align-items: center;
  background: ${colors.light};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 800px;

  & + div {
    margin-top: 16px;
  }

  strong {
    color: ${colors.dark};
    font-size: 20px;
  }

  div {
    display: flex;
    flex-direction: row;

    button {
      width: 64px;

      & + button {
        margin-left: 8px;
      }
    }
  }
`;
