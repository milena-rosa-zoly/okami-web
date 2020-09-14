import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { shade } from 'polished';
import colors from '../../styles/colors';

interface BadgeProps {
  hasUnread: boolean;
}

interface NotificationsListProps {
  visible: boolean;
}

interface NotificationProps {
  unread: boolean;
}

export const Wrapper = styled.div`
  margin-right: 10px;
  position: relative;
`;

export const Badge = styled.button<BadgeProps>`
  background: none;
  border: 0;
  color: ${colors.light};
  position: relative;

  ${props =>
    props.hasUnread &&
    css`
      &::after {
        background: ${colors.darkPink};
        border-radius: 50%;
        content: '';
        height: 8px;
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
      }
    `}
`;

export const NotificationList = styled.div<NotificationsListProps>`
  background: ${colors.dark};
  border-radius: 4px;
  display: ${props => (props.visible ? 'block' : 'none')};
  left: calc(50% - 130px);
  opacity: 0.6;
  padding: 15px 5px;
  position: absolute;
  top: calc(100% + 30px);
  width: 260px;

  &::before {
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
    content: '';
    height: 0;
    left: calc(50% - 20px);
    position: absolute;
    top: -20px;
    width: 0;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div<NotificationProps>`
  color: ${colors.light};

  & + div {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 15px;
    padding-top: 15px;
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    margin-bottom: 5px;
    opacity: 0.6;
  }

  button {
    background: none;
    border: 0;
    color: ${shade(0.2, colors.light)};
    font-size: 12px;
  }

  ${props =>
    props.unread &&
    css`
      &::after {
        background: ${colors.darkPink};
        border-radius: 50%;
        content: '';
        display: inline-block;
        height: 8px;
        margin-left: 10px;
        width: 8px;
      }
    `}
`;
