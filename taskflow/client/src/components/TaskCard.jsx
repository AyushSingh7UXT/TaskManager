import { Link } from 'react-router-dom';

export default function TaskCard({ task, onDelete }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-soft">
      <div className="flex justify-between items-start gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">{task.status}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">{task.priority}</span>
      </div>
      <h3 className="text-lg font-bold mt-3">{task.title}</h3>
      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{task.description}</p>
      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mt-4">
        <div className="h-full rounded-full bg-brand" style={{ width: `${task.progress}%` }} />
      </div>
      <div className="flex gap-2 mt-4">
        <Link className="text-sm text-brand" to={`/tasks/${task._id}`}>Details</Link>
        <Link className="text-sm text-emerald-600" to={`/tasks/${task._id}/edit`}>Edit</Link>
        <button className="text-sm text-red-600" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
