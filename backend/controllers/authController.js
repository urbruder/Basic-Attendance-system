// backend/controllers/authController.js
const MOCK_TEACHER = { email: 'teacher@example.com', password: 'password123', name: 'Dr. Evelyn Reed' };

// Use 'export const' for named exports
export const login = (req, res) => {
  const { email, password } = req.body;
  if (email === MOCK_TEACHER.email && password === MOCK_TEACHER.password) {
    res.json({ token: 'fake-jwt-token', user: { name: MOCK_TEACHER.name } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};