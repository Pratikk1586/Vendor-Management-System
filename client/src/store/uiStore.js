/**
 * @fileoverview Zustand store for global UI state (sidebar, modals).
 */

import { create } from 'zustand';

/**
 * UI store hook for layout and modal state.
 * @type {import('zustand').UseBoundStore}
 */
export const useUiStore = create((set) => ({
  sidebarOpen: true,
  activeModal: null,
  modalData: null,

  /**
   * Toggles sidebar open/closed state.
   */
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  /**
   * Opens a named modal with optional data payload.
   * @param {string} name Modal identifier.
   * @param {*} [data] Optional data passed to the modal.
   */
  openModal: (name, data = null) => {
    set({ activeModal: name, modalData: data });
  },

  /**
   * Closes the active modal and clears modal data.
   */
  closeModal: () => {
    set({ activeModal: null, modalData: null });
  },
}));
