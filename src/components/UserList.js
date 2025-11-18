import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserList({ users, onConfirmDelete }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  return (
    <div className="overflow-x-auto max-w-4xl mx-auto mt-8 p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 border-b font-medium text-gray-700">Name</th>
            <th className="py-3 px-6 border-b font-medium text-gray-700">Email</th>
            <th className="py-3 px-6 border-b font-medium text-gray-700">Phone</th>
            <th className="py-3 px-6 border-b font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
              <td className="py-2 px-6 border-b">{user.name}</td>
              <td className="py-2 px-6 border-b">{user.email}</td>
              <td className="py-2 px-6 border-b">{user.phone}</td>
              <td className="py-2 px-6 border-b">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition min-w-[70px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onConfirmDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition min-w-[70px]"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
