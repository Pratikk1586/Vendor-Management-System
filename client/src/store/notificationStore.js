/**
 * @fileoverview Zustand store for in-app notification state.
 */

import { create } from 'zustand';

/**
 * Notification store hook.
 * @type {import('zustand').UseBoundStore}
 */
export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  /**
   * Replaces the full notifications list and recalculates unread count.
   * @param {object[]} notifications Notification array from API.
   */
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    set({ notifications, unreadCount });
  },

  /**
   * Adds a notification to the list.
   * @param {object} notification New notification object.
   */
  addNotification: (notification) => {
    set((state) => {
      const notifications = [notification, ...state.notifications];
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      return { notifications, unreadCount };
    });
  },

  /**
   * Marks a single notification as read.
   * @param {string} id Notification ID.
   */
  markRead: (id) => {
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n._id === id || n.id === id ? { ...n, isRead: true } : n,
      );
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      return { notifications, unreadCount };
    });
  },

  /**
   * Marks all notifications as read.
   */
  markAllRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },
}));
