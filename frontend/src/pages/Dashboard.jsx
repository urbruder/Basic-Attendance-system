import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startAttendanceSession } from '../services/api';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleStartSession = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { data } = await startAttendanceSession();
      // Redirect to the live session page with the new session ID
      navigate(`/attendance/${data.sessionId}`);
    } catch (err) {
      setError('Failed to start a new session. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto mt-10 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'Teacher'}!</h1>
          <p className="mt-2 text-gray-600">Ready to start taking attendance?</p>
          <div className="mt-8">
            <button
              onClick={handleStartSession}
              disabled={isLoading}
              className="px-8 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
            >
              {isLoading ? 'Starting...' : 'Start Attendance Session'}
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;