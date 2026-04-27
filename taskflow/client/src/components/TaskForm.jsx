import { useFieldArray, useForm } from 'react-hook-form';

export default function TaskForm({ initialValues, users, onSubmit, submitting }) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: initialValues || {
      title: '', description: '', priority: 'Medium', status: 'Pending', category: 'General',
      dueDate: '', checklist: [{ text: '', completed: false }], attachments: [''], assignedUsers: []
    },
  });
  const checklist = useFieldArray({ control, name: 'checklist' });
  const attachments = useFieldArray({ control, name: 'attachments' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 glass rounded-2xl p-6">
      <input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" placeholder="Title" {...register('title', { required: true })} />
      <textarea className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" placeholder="Description" {...register('description')} />
      <div className="grid md:grid-cols-3 gap-3">
        <select className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800" {...register('priority')}><option>Low</option><option>Medium</option><option>High</option></select>
        <select className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800" {...register('status')}><option>Pending</option><option>In Progress</option><option>Completed</option></select>
        <input type="date" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800" {...register('dueDate')} />
      </div>
      <select multiple className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" {...register('assignedUsers')}>
        {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
      <div>
        <p className="font-semibold mb-2">Checklist</p>
        {checklist.fields.map((f, i) => (
          <div key={f.id} className="flex gap-2 mb-2">
            <input className="flex-1 p-2 rounded bg-slate-100 dark:bg-slate-800" {...register(`checklist.${i}.text`)} placeholder="Checklist item" />
            <button type="button" onClick={() => checklist.remove(i)}>x</button>
          </div>
        ))}
        <button type="button" onClick={() => checklist.append({ text: '', completed: false })} className="text-brand">+ Add item</button>
      </div>
      <div>
        <p className="font-semibold mb-2">Attachments Links</p>
        {attachments.fields.map((f, i) => (
          <input key={f.id} className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800 mb-2" {...register(`attachments.${i}`)} placeholder="https://..." />
        ))}
        <button type="button" onClick={() => attachments.append('')} className="text-brand">+ Add link</button>
      </div>
      <button disabled={submitting} className="bg-brand text-white px-5 py-3 rounded-xl font-semibold w-full">{submitting ? 'Saving...' : 'CREATE TASK'}</button>
    </form>
  );
}
