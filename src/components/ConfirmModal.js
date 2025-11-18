import React from 'react';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full text-center">
        <p className="mb-6 text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onConfirm} 
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
          >
            Confirm
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
