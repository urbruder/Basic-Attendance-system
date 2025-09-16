import Session from '../models/Session.js';

export const startSession = async (req, res) => {
  try {
    const newSession = new Session();
    await newSession.save();
    console.log(`Session started: ${newSession._id}`);
    res.status(201).json({ sessionId: newSession._id });
  } catch (error) {
    console.error('Error starting session:', error);
    res.status(500).json({ message: 'Failed to start session.' });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { sessionId, name, rollNumber } = req.body;
    if (!sessionId || !name || !rollNumber) {
      return res.status(400).json({ message: 'Session ID, name, and roll number are required.' });
    }

    const session = await Session.findById(sessionId);
    if (!session || !session.isActive) {
      return res.status(404).json({ message: 'Session not found or is inactive.' });
    }

    const isDuplicate = session.attendees.some(
      (attendee) => attendee.rollNumber.toLowerCase() === rollNumber.toLowerCase()
    );

    if (isDuplicate) {
      return res.status(409).json({ message: `Roll number ${rollNumber} has already been marked present.` });
    }
    
    session.attendees.push({ name, rollNumber });
    await session.save();

    console.log(`Attendee Added: ${name} (${rollNumber}) to session ${sessionId}`);
    res.status(201).json({ message: `Attendance marked successfully for ${name}!` });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'An error occurred while marking attendance.' });
  }
};

export const getStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);

    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    console.error('Error getting session status:', error);
    res.status(500).json({ message: 'An error occurred while fetching session status.' });
  }
};