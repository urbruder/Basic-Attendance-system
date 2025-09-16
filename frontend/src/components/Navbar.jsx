import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
            Attendance System
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-800">Hello, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold text-indigo-600 bg-indigo-100 rounded hover:bg-indigo-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;