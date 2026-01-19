/**
 * ConfirmModal Component
 * Confirmation dialog before submitting a guess
 */

import React, { useEffect, useRef } from 'react';
import type { DisplayComment } from '../../types';

export interface ConfirmModalProps {
  isOpen: boolean;
  comment: DisplayComment | null;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

/**
 * Truncate text to a maximum length
 */
function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * ConfirmModal component
 */
export function ConfirmModal({
  isOpen,
  comment,
  onConfirm,
  onCancel,
  isSubmitting = false,
}: ConfirmModalProps): React.ReactElement | null {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the confirm button when modal opens
    confirmButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
      // Basic focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !comment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-fade-in"
      >
        {/* Title */}
        <h2
          id="confirm-modal-title"
          className="text-xl font-bold text-gray-900 text-center mb-4"
        >
          You selected Comment #{comment.displayIndex + 1}:
        </h2>

        {/* Comment Preview */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-500 mb-1">u/{comment.username}</div>
          <div className="text-gray-800 italic">
            "{truncateText(comment.text)}"
          </div>
        </div>

        {/* Confirmation text */}
        <p className="text-center text-gray-700 font-medium mb-6">
          Is this your final answer?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            ref={confirmButtonRef}
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors duration-200"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Guess'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
