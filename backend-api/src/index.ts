import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan React mengakses API ini
app.use(express.json()); // Supaya bisa baca JSON dari React

// Routes
// URL nanti jadi: http://localhost:5000/api/auth/login
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Backend Node.js Siap Tempur! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});