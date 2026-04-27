import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmModal({ open, title, message, onCancel, onConfirm, confirmText = 'Confirm' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft w-full max-w-md p-6" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-slate-500">{message}</p>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={onCancel} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">Cancel</button>
              <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-600 text-white">{confirmText}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
