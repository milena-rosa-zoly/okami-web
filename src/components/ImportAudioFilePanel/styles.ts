import styled from 'styled-components';
import colors from '../../styles/colors';

export const ImportFileContainer = styled.section`
  background: ${colors.light};
  border-radius: 4px;
  margin-top: 40px;
  padding: 48px;

  form {
    > div:nth-child(3) {
      background: #eee;
    }
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Footer = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  p {
    align-items: center;
    color: ${colors.mediumGrey};
    display: flex;
    font-size: 12px;
    line-height: 18px;

    svg {
      color: ${colors.darkPink};
      margin-right: 10px;
    }
  }

  button {
    width: 200px;
  }
`;
