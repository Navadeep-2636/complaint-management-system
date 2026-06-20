const statusConfig = {
  pending: {
    label: 'Pending',
    classes: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
  },
  'in-progress': {
    label: 'In Progress',
    classes: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30',
  },
  resolved: {
    label: 'Resolved',
    classes: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${config.classes}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {config.label}
    </span>
  );
};

export default StatusBadge;
