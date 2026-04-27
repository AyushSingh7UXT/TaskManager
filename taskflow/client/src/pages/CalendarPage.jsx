import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date());
  const { tasks } = useTasks({ limit: 200 });

  const { monthLabel, days } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const leading = first.getDay();

    const data = [];
    for (let i = 0; i < leading; i += 1) data.push(null);
    for (let d = 1; d <= last.getDate(); d += 1) data.push(new Date(year, month, d));

    return {
      monthLabel: cursor.toLocaleString('default', { month: 'long', year: 'numeric' }),
      days: data,
    };
  }, [cursor]);

  const dueMap = useMemo(() => {
    const map = new Map();
    tasks.forEach((task) => {
      if (!task.dueDate) return;
      const key = new Date(task.dueDate).toISOString().slice(0, 10);
      const row = map.get(key) || [];
      row.push(task);
      map.set(key, row);
    });
    return map;
  }, [tasks]);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-bold">{monthLabel}</h1>
        <button onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm mb-2">
        {weekdays.map((day) => <div key={day} className="font-semibold text-center">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) => {
          if (!date) return <div key={`blank-${idx}`} className="h-24 rounded-xl bg-slate-50 dark:bg-slate-900" />;
          const key = date.toISOString().slice(0, 10);
          const dayTasks = dueMap.get(key) || [];
          const isToday = key === new Date().toISOString().slice(0, 10);
          return (
            <div key={key} className={`h-24 rounded-xl p-2 overflow-hidden ${isToday ? 'bg-indigo-50 dark:bg-indigo-950' : 'bg-slate-50 dark:bg-slate-900'}`}>
              <p className="text-xs font-bold">{date.getDate()}</p>
              <div className="space-y-1 mt-1">
                {dayTasks.slice(0, 2).map((t) => (
                  <p key={t._id} className="text-[10px] truncate px-1 py-0.5 rounded bg-brand/15 text-brand">{t.title}</p>
                ))}
                {dayTasks.length > 2 && <p className="text-[10px] text-slate-500">+{dayTasks.length - 2} more</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
