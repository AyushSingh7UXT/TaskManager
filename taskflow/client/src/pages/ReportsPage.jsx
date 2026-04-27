import { useTasks } from '../hooks/useTasks';

export default function ReportsPage() {
  const { tasks } = useTasks({ limit: 100 });
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const delayed = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="glass rounded-2xl p-6"><h2 className="font-bold">Weekly Productivity</h2><p>{completed} tasks completed this week.</p></div>
      <div className="glass rounded-2xl p-6"><h2 className="font-bold">Delayed Tasks</h2><p>{delayed} overdue tasks.</p></div>
      <div className="glass rounded-2xl p-6 md:col-span-2"><h2 className="font-bold">AI Smart Suggestions</h2><p>Focus on high-priority overdue tasks first and reduce WIP by 20%.</p></div>
    </div>
  );
}
