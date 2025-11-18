import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UserForm({ onAdd, onUpdate, users }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && users) {
      const userToEdit = users.find(u => u.id.toString() === id);
      if (userToEdit) {
        setForm({ name: userToEdit.name, email: userToEdit.email, phone: userToEdit.phone });
      }
    }
  }, [id, isEdit, users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newUser = { ...form, id: isEdit ? Number(id) : Date.now() };

    try {
      if (isEdit) {
        onUpdate && onUpdate(newUser);
      } else {
        onAdd && onAdd(newUser);
      }
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <style>{`
          .loader {
            border-top-color: #3490dc;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-6">
      {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="example@mail.com"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="+1 234 567 890"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isEdit ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
}
