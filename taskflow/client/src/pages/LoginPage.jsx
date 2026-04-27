import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (values) => {
    await login(values);
    navigate('/');
  };

  return (
    <div className="min-h-screen grid md:grid-cols-5 bg-white">
      <div className="md:col-span-3 p-8 md:p-14 flex items-center">
        <form onSubmit={handleSubmit(submit)} className="max-w-md w-full space-y-4">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-slate-500">Sign in to continue managing your workflow.</p>
          <input {...register('email')} className="w-full p-3 rounded-xl bg-slate-100" placeholder="Email" />
          <input type="password" {...register('password')} className="w-full p-3 rounded-xl bg-slate-100" placeholder="Password" />
          <button className="w-full bg-brand text-white py-3 rounded-xl font-semibold">LOGIN</button>
          <p className="text-sm">No account? <Link className="text-brand" to="/signup">Sign up</Link></p>
        </form>
      </div>
      <div className="md:col-span-2 bg-gradient-to-b from-indigo-600 to-indigo-800 p-8 text-white hidden md:block">
        <h2 className="text-2xl font-bold mb-6">TaskFlow</h2>
        {['Social Media Campaign', 'Adam Cole', 'Luke Ryan'].map((t, i) => (
          <motion.div key={t} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 + i }} className="bg-white/20 rounded-2xl p-4 mb-4">
            {t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
