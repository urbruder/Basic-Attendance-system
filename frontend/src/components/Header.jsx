import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/solid'; // A nice icon for flair

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CalendarDaysIcon className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-800">
            AutoAttend
          </span>
        </Link>
        <div>
          <Link
            to="/login"
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-300"
          >
            Teacher Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;