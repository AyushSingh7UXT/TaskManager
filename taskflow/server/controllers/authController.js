import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const registerUser = async (req, res) => {
  const { name, email, password, inviteToken } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : '';

  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = inviteToken && inviteToken === process.env.ADMIN_INVITE_TOKEN ? 'admin' : 'user';

  const user = await User.create({ name, email, password: hashedPassword, avatar, role, inviteToken });
  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
};

export const logoutUser = async (_req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  res.json({ message: 'Logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
  res.json(req.user);
};
