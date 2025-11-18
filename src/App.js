import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';

function Header() {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isAddUser = location.pathname === '/users/new';

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
      <h1 className="text-xl font-semibold ml-4">User Management</h1>
      <nav className="mr-4 flex space-x-4">
        {!isHome && (
          <Link to="/" className="hover:underline">
            Home
          </Link>
        )}
        {!isAddUser && (
          <Link to="/users/new" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
            Add User
          </Link>
        )}
      </nav>
    </header>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const [confirm, setConfirm] = useState({ visible: false, userId: null });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4000);
  };

  const addUser = (user) => {
    setUsers(prev => [...prev, user]);
    showToast('User added successfully!');
  };

  const updateUser = (updatedUser) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    showToast('User updated successfully!');
  };

  const confirmDelete = (id) => {
    setConfirm({ visible: true, userId: id });
  };

  const handleDelete = () => {
    if (confirm.userId != null) {
      setUsers(prev => prev.filter(user => user.id !== confirm.userId));
      showToast('User deleted successfully!');
    }
    setConfirm({ visible: false, userId: null });
  };

  if (loading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">Error: {error}</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<UserList users={users} onConfirmDelete={confirmDelete} />} />
            <Route path="/users/new" element={<UserForm onAdd={addUser} />} />
            <Route path="/users/:id/edit" element={<UserForm users={users} onUpdate={updateUser} />} />
          </Routes>
        </main>
        {toast.visible && <Toast message={toast.message} type={toast.type} />}
        {confirm.visible && (
          <ConfirmModal 
            message="Are you sure you want to delete this user?" 
            onConfirm={handleDelete} 
            onCancel={() => setConfirm({ visible: false, userId: null })}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
