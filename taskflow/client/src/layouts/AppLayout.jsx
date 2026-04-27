import { Outlet, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Moon, Search, Sun } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout, darkMode, setDarkMode } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-page dark:bg-slate-950">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8">
          <header className="glass rounded-2xl p-4 mb-6 shadow-soft flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2">
              <Search size={18} />
              <input className="bg-transparent w-full outline-none" placeholder="Search tasks, members, reports" />
            </div>
            <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><Bell size={18} /></button>
            <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800" onClick={() => setDarkMode((p) => !p)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => navigate('/profile')} className="font-semibold">{user?.name}</button>
            <button onClick={logout} className="p-2 rounded-xl bg-red-100 text-red-600"><LogOut size={18} /></button>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
