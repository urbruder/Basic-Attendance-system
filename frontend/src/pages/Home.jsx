import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { QrCodeIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-indigo-100">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Effortless Attendance Tracking
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Streamline your classroom management with a simple, QR-code based attendance system. Save time, reduce paperwork, and get instant insights.
        </p>
        <div className="mt-10">
          <Link
            to="/login"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
          >
            Get Started for Free
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<QrCodeIcon className="h-8 w-8 text-indigo-600" />}
              title="Generate QR Code"
              description="A teacher logs in and starts a session, instantly generating a unique QR code for the class."
            />
            <FeatureCard
              icon={<UserGroupIcon className="h-8 w-8 text-indigo-600" />}
              title="Students Scan & Join"
              description="Students scan the code with their devices to securely and quickly mark themselves as present."
            />
            <FeatureCard
              icon={<ClockIcon className="h-8 w-8 text-indigo-600" />}
              title="Real-Time Tracking"
              description="The teacher's dashboard updates in real-time, showing a live list of all present students."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-6 py-4 text-center">
              <p>&copy; {new Date().getFullYear()} AutoAttend. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}

export default Home;