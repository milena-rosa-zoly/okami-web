import styled from 'styled-components';
import { shade } from 'polished';
import colors from '../../styles/colors';

export const Wrapper = styled.header`
  background: ${colors.dark};
  border-bottom: 1px solid ${colors.light};
  color: ${colors.light};
  max-height: 120px;

  img {
    height: 60px;
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  max-width: 1200px;
  padding: 5px;

  > img {
    margin-right: 20px;
    padding-right: 20px;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  /* margin: 0 10px; */

  div {
    flex-direction: column;
    margin-right: 16px;
    text-align: right;

    strong {
      font-size: 16px;
      font-weight: 600;
    }

    p {
      color: ${colors.mediumGrey};
      font-size: 14px;
      margin-top: 2px;
    }
  }

  img {
    border: 2px solid ${colors.darkPink};
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
`;

export const SignOutButton = styled.button`
  background: transparent;
  border: 0;
  border-radius: 4px;
  color: ${colors.light};
  font-weight: 600;
  height: 30px;
  transition: color 300ms;
  width: 70px;

  &:hover {
    color: ${shade(0.4, colors.light)};
  }
`;
