import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { HiOutlineExclamation } from 'react-icons/hi';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, isDeleting }) {
  const footer = (
    <>
      <Button variant="ghost" onClick={onClose} disabled={isDeleting}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>Confirm Delete</Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Action" footer={footer}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
          <HiOutlineExclamation className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </Modal>
  );
}
