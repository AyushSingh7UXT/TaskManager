import Task from '../models/Task.js';

const csvEscape = (value = '') => `"${String(value).replace(/"/g, '""')}"`;

export const exportReport = async (_req, res) => {
  const tasks = await Task.find().populate('assignedUsers', 'name').lean();
  const headers = ['Title', 'Priority', 'Status', 'Due Date', 'Progress', 'Assigned Users'];
  const rows = tasks.map((t) => [
    csvEscape(t.title),
    csvEscape(t.priority),
    csvEscape(t.status),
    csvEscape(t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : ''),
    csvEscape(`${t.progress}%`),
    csvEscape((t.assignedUsers || []).map((u) => u.name).join(', ')),
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=taskflow-report.csv');
  res.status(200).send(csv);
};
