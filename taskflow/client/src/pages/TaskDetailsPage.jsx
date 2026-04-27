import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import api from '../services/api';

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => { api.get(`/tasks/${id}`).then((res) => setTask(res.data)); }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      {task.status === 'Completed' && <Confetti recycle={false} numberOfPieces={150} />}
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="mt-2 text-slate-500">{task.description}</p>
      <p className="mt-4">Progress: {task.progress}%</p>
      <ul className="mt-4 space-y-2">
        {task.checklist?.map((item, i) => <li key={i}>{item.completed ? '✅' : '⬜'} {item.text}</li>)}
      </ul>
    </div>
  );
}
