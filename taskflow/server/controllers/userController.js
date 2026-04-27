import User from '../models/User.js';
import Task from '../models/Task.js';

export const getUsers = async (_req, res) => {
  const users = await User.find().select('-password').lean();
  const tasks = await Task.find().lean();

  const withStats = users.map((user) => {
    const assigned = tasks.filter((t) => t.assignedUsers?.some((id) => id.toString() === user._id.toString()));
    return {
      ...user,
      pendingCount: assigned.filter((t) => t.status === 'Pending').length,
      progressCount: assigned.filter((t) => t.status === 'In Progress').length,
      completedCount: assigned.filter((t) => t.status === 'Completed').length,
    };
  });

  res.json(withStats);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
