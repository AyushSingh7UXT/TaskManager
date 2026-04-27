import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const tabs = ['Profile', 'Security', 'Notifications', 'Theme', 'Team Access'];

export default function SettingsPage() {
  const [active, setActive] = useState('Profile');
  const { user, darkMode, setDarkMode } = useAuth();

  const save = () => toast.success(`${active} settings saved`);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-xl ${active === tab ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 'Profile' && (
        <div className="space-y-3 max-w-xl">
          <input defaultValue={user?.name} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <input defaultValue={user?.email} className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
      )}

      {active === 'Security' && (
        <div className="space-y-3 max-w-xl">
          <input type="password" placeholder="Current Password" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <input type="password" placeholder="New Password" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
      )}

      {active === 'Notifications' && (
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Deadline reminders</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Weekly report emails</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Team mentions</label>
        </div>
      )}

      {active === 'Theme' && (
        <div>
          <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      )}

      {active === 'Team Access' && (
        <div className="space-y-3 max-w-xl">
          <input placeholder="Invite member email" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <select className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800"><option>User</option><option>Admin</option></select>
        </div>
      )}

      <button onClick={save} className="mt-6 px-5 py-2 rounded-xl bg-brand text-white">Save Changes</button>
    </div>
  );
}
