/**
 * @fileoverview Toast notification hook wrapping react-hot-toast.
 */

import toast from 'react-hot-toast';

/**
 * Returns toast helper functions for consistent notifications.
 * @returns {{ toastSuccess: Function, toastError: Function, toastInfo: Function, toastLoading: Function }}
 */
export function useToast() {
  /**
   * Shows a success toast.
   * @param {string} message Toast message.
   */
  const toastSuccess = (message) => {
    toast.success(message);
  };

  /**
   * Shows an error toast.
   * @param {string} message Toast message.
   */
  const toastError = (message) => {
    toast.error(message);
  };

  /**
   * Shows an info toast.
   * @param {string} message Toast message.
   */
  const toastInfo = (message) => {
    toast(message, { icon: 'ℹ️' });
  };

  /**
   * Shows a loading toast and returns its ID for dismissal.
   * @param {string} message Toast message.
   * @returns {string} Toast ID.
   */
  const toastLoading = (message) => {
    return toast.loading(message);
  };

  return { toastSuccess, toastError, toastInfo, toastLoading };
}
