/**
 * @fileoverview Confirmation modal for destructive or important actions.
 */

import Modal from './Modal.jsx';
import Button from './Button.jsx';

/**
 * @param {object} props Component props.
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {function} props.onConfirm
 * @param {string} props.title
 * @param {string} props.message
 * @param {string} [props.confirmLabel='Confirm']
 * @param {'danger'|'warning'} [props.variant='danger']
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  variant = 'danger',
}) {
  const confirmVariant = variant === 'danger' ? 'danger' : 'primary';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-300">{message}</p>
    </Modal>
  );
}
