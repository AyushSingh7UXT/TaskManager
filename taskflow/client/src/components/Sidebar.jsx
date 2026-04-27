import { NavLink } from 'react-router-dom';
import { sidebarLinks } from '../utils/constants';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 p-6 border-r border-slate-200 dark:border-slate-800">
      <h1 className="text-2xl font-extrabold text-brand mb-8">TaskFlow</h1>
      <nav className="space-y-2">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-medium transition ${
                isActive ? 'bg-brand text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
