import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([k, v]) => formData.append(k, v));
    if (values.avatar?.[0]) formData.set('avatar', values.avatar[0]);
    await signup(formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen grid md:grid-cols-5 bg-white">
      <div className="md:col-span-3 p-8 md:p-14 flex items-center">
        <form onSubmit={handleSubmit(submit)} className="max-w-md w-full space-y-4">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <input type="file" {...register('avatar')} className="w-full p-3 rounded-xl bg-slate-100" />
          <input {...register('name')} className="w-full p-3 rounded-xl bg-slate-100" placeholder="Full Name" />
          <input {...register('email')} className="w-full p-3 rounded-xl bg-slate-100" placeholder="Email" />
          <input type="password" {...register('password')} className="w-full p-3 rounded-xl bg-slate-100" placeholder="Password" />
          <input {...register('inviteToken')} className="w-full p-3 rounded-xl bg-slate-100" placeholder="Admin Invite Token" />
          <button className="w-full bg-brand text-white py-3 rounded-xl font-semibold">SIGNUP</button>
          <p className="text-sm">Already have account? <Link className="text-brand" to="/login">Login</Link></p>
        </form>
      </div>
      <div className="md:col-span-2 bg-gradient-to-b from-indigo-600 to-indigo-800 hidden md:block" />
    </div>
  );
}
