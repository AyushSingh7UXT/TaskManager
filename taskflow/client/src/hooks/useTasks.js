import { useEffect, useState } from 'react';
import api from '../services/api';

export const useTasks = (params = {}) => {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await api.get('/tasks', { params });
    setTasks(data.tasks);
    setMeta({ page: data.page, totalPages: data.totalPages, total: data.total });
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [JSON.stringify(params)]);

  return { tasks, meta, loading, refresh: fetchTasks };
};
