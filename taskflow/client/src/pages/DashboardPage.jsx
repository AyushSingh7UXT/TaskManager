import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatsCard from '../components/StatsCard';
import { useTasks } from '../hooks/useTasks';

export default function DashboardPage() {
  const { tasks } = useTasks({ limit: 50 });
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    progress: tasks.filter((t) => t.status === 'In Progress').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Good Morning, Mike 👋</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard label="Total Tasks" value={stats.total} tone="text-indigo-600" />
        <StatsCard label="Pending" value={stats.pending} tone="text-orange-600" />
        <StatsCard label="In Progress" value={stats.progress} tone="text-blue-600" />
        <StatsCard label="Completed" value={stats.completed} tone="text-emerald-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass p-6 rounded-2xl h-80">
          <h2 className="font-semibold mb-4">Task Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={[{ name: 'Pending', value: stats.pending }, { name: 'In Progress', value: stats.progress }, { name: 'Completed', value: stats.completed }]} dataKey="value" outerRadius={110}>
                {['#f59e0b', '#3b82f6', '#10b981'].map((c) => <Cell key={c} fill={c} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass p-6 rounded-2xl h-80">
          <h2 className="font-semibold mb-4">Priority Levels</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={['Low', 'Medium', 'High'].map((p) => ({ name: p, count: tasks.filter((t) => t.priority === p).length }))}>
              <XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
