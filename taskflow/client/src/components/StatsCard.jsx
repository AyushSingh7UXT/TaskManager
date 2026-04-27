import { motion } from 'framer-motion';

export default function StatsCard({ label, value, tone }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="glass rounded-2xl p-5 shadow-soft">
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className={`text-3xl font-bold mt-2 ${tone}`}>{value}</h3>
    </motion.div>
  );
}
