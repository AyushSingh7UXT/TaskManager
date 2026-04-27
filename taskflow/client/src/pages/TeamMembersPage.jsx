import { useEffect, useState } from 'react';
import api from '../services/api';

export default function TeamMembersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.get('/users').then((res) => setUsers(res.data)); }, []);

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map((u) => (
        <div key={u._id} className="glass rounded-2xl p-5">
          <h3 className="font-bold text-lg">{u.name}</h3><p className="text-slate-500 text-sm">{u.email}</p>
          <p className="mt-2">Role: {u.role}</p>
          <p className="text-sm">Pending: {u.pendingCount} | In Progress: {u.progressCount} | Completed: {u.completedCount}</p>
          <div className="mt-3 flex gap-2 text-sm"><button className="text-brand">View Profile</button><button className="text-emerald-600">Assign Task</button><button className="text-orange-600">Message</button></div>
        </div>
      ))}
    </div>
  );
}
