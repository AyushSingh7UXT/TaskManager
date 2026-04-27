import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import TaskForm from '../components/TaskForm';

export default function EditTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get(`/tasks/${id}`), api.get('/users')]).then(([t, u]) => {
      setTask({ ...t.data, dueDate: t.data.dueDate?.slice(0, 10) || '' });
      setUsers(u.data);
    });
  }, [id]);

  if (!task) return <div>Loading...</div>;

  const submit = async (values) => {
    await api.put(`/tasks/${id}`, values);
    navigate('/tasks');
  };

  return <TaskForm users={users} initialValues={task} onSubmit={submit} />;
}
