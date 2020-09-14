import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { FiBell } from 'react-icons/fi';
import { parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Wrapper,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

interface Notification {
  id: string;
  read: boolean;
  content: string;
  timeDistance: string;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications],
  );

  useEffect(() => {
    // api.get<Notification[]>('notifications').then(...)
    // setNotifications(data);
  }, []);

  const handleToggleVisible = useCallback(() => setVisible(!visible), [
    visible,
  ]);

  const handleMarkAsRead = useCallback(
    async id => {
      // await api.put(`notifications/${id}`);

      setNotifications(
        notifications.map(notification =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    },
    [notifications],
  );

  return (
    <Wrapper>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <FiBell size={24} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification.id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Wrapper>
  );
};

export default Notifications;
