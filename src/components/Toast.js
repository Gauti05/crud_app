import React from 'react';

export default function Toast({ message, type }) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={`fixed bottom-6 right-6 text-white px-6 py-3 rounded shadow-lg ${bgColor} animate-fadein`}>
      {message}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          animation: fadein 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
