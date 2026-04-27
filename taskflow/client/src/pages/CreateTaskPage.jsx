import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import TaskForm from '../components/TaskForm';

export default function CreateTaskPage() {
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { api.get('/users').then((res) => setUsers(res.data)); }, []);

  const submit = async (data) => {
    setSubmitting(true);
    await api.post('/tasks', data);
    toast.success('Task created');
    navigate('/tasks');
  };

  return <TaskForm users={users} onSubmit={submit} submitting={submitting} />;
}
