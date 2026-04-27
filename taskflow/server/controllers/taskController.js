import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  const populated = await task.populate('assignedUsers', 'name email avatar role');
  res.status(201).json(populated);
};

export const getTasks = async (req, res) => {
  const { status, search = '', sortBy = 'dueDate', order = 'asc', page = 1, limit = 10 } = req.query;
  const query = {
    ...(status ? { status } : {}),
    title: { $regex: search, $options: 'i' },
  };

  const skip = (Number(page) - 1) * Number(limit);
  const tasks = await Task.find(query)
    .populate('assignedUsers', 'name email avatar role')
    .populate('createdBy', 'name email')
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);
  res.json({ tasks, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate('assignedUsers', 'name email avatar role');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  Object.assign(task, req.body);
  await task.save();
  const populated = await task.populate('assignedUsers', 'name email avatar role');
  res.json(populated);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.deleteOne();
  res.json({ message: 'Task deleted successfully' });
};
