import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: Date },
    startDate: { type: Date, default: Date.now },
    category: { type: String, default: 'General' },
    checklist: [checklistItemSchema],
    attachments: [{ type: String }],
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    progress: { type: Number, default: 0, min: 0, max: 100 },
    estimatedTime: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

taskSchema.pre('save', function autoUpdateStatus(next) {
  if (!this.checklist?.length) {
    this.progress = 0;
    if (this.status === 'Completed') this.status = 'Pending';
    return next();
  }

  const done = this.checklist.filter((item) => item.completed).length;
  this.progress = Math.round((done / this.checklist.length) * 100);

  if (done === 0) this.status = 'Pending';
  else if (done === this.checklist.length) this.status = 'Completed';
  else this.status = 'In Progress';

  next();
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
