import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { getAttendanceStatus } from "../services/api";
import Navbar from "../components/Navbar";

function AttendanceSession() {
  const { sessionId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  // --- CONFIGURATION COMPLETE ---
  // The placeholder values have been replaced with your specific Google Form details.
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd-bOmnOJv5eqLEvMjknSfhaTrsn7ZCBakXT3JtOm24NeFuwg/viewform";
  const SESSION_ID_FIELD = "entry.1980081873";
  
  // This constructs the specific link for your Google Form
  const attendanceUrl = `${GOOGLE_FORM_URL}?usp=pp_url&${SESSION_ID_FIELD}=${sessionId}`;
  // --- END OF CONFIGURATION ---

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await getAttendanceStatus(sessionId);
        if (data.isActive) {
          setAttendees(data.attendees || []); 
        } else {
          clearInterval(intervalRef.current);
          setError("This attendance session has ended.");
        }
      } catch (err) {
        setError("Could not fetch attendance status.");
        clearInterval(intervalRef.current);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 3000); 

    return () => clearInterval(intervalRef.current);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Live Attendance Session
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Scan to Mark Attendance
            </h2>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <QRCode
                value={attendanceUrl}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Students: Scan this code to open the Google Form.
            </p>
            <p className="mt-2 text-sm font-mono text-gray-600 break-all">
              Session ID: {sessionId}
            </p>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Attendees ({attendees.length})
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            {isLoading ? (
              <p>Loading attendees...</p>
            ) : (
              <div className="overflow-auto max-h-96">
                {attendees.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Roll Number</th>
                        <th scope="col" className="px-6 py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendees.map((student, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-4">{student.rollNumber}</td>
                          <td className="px-6 py-4">{new Date(student.timestamp).toLocaleTimeString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No students have checked in yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AttendanceSession;