import { useAuth } from '../context/AuthContext';

export default function UserProfilePage() {
  const { user } = useAuth();
  return (
    <div className="glass rounded-2xl p-6">
      <h1 className="text-xl font-bold">User Profile</h1>
      <p className="mt-2">Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p className="mt-4">Productivity streak: 7 days 🔥</p>
      <p>Focus timer widget: 25:00</p>
      <p>Team leaderboard rank: #2</p>
    </div>
  );
}
