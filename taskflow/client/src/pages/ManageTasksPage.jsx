import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import ConfirmModal from '../components/ConfirmModal';

export default function ManageTasksPage() {
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const { tasks, refresh } = useTasks({ status, search, limit: 30 });

  const requestDelete = (id) => setDeleteId(id);

  const onDelete = async () => {
    await api.delete(`/tasks/${deleteId}`);
    toast.success('Task deleted');
    setDeleteId(null);
    refresh();
  };

  const exportCsv = async () => {
    const res = await api.get('/reports/export', { responseType: 'blob' });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflow-report.csv';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {['', 'Pending', 'In Progress', 'Completed'].map((s) => (
          <button key={s || 'All'} onClick={() => setStatus(s)} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800">
            {s || 'All'}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800"
        />
        <button onClick={exportCsv} className="px-4 py-2 rounded-xl bg-brand text-white">Download Report</button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tasks.map((task) => <TaskCard key={task._id} task={task} onDelete={requestDelete} />)}
      </div>

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete task"
        message="This action cannot be undone. Do you want to continue?"
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
        confirmText="Delete"
      />
    </div>
  );
}
