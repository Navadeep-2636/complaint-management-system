import { useEffect, useState } from 'react';
import { getAllComplaints, updateComplaintStatus } from '../../api/complaintApi';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';

const STATUS_CYCLE = ['pending', 'in-progress', 'resolved'];

const ManageComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  useEffect(() => {
    getAllComplaints()
      .then((res) => setComplaints(res.data.complaints))
      .catch(() => setError('Failed to load complaints.'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateComplaintStatus(id, newStatus);
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      setSuccessId(id);
      setTimeout(() => setSuccessId(null), 2000);
    } catch {
      setError(`Failed to update complaint ${id}.`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Manage Complaints ⚙️</h1>
        <p className="text-slate-400 mt-1 text-sm">Update the status of all submitted complaints.</p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : complaints.length === 0 ? (
        <div className="bg-slate-900/40 border border-dashed border-slate-700/60 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-400 text-sm">No complaints to manage.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div
              key={c._id}
              id={`manage-${c._id}`}
              className={`bg-slate-900/60 border rounded-2xl p-5 transition-all ${
                successId === c._id
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-slate-800/60 hover:border-slate-700/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Complaint Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold text-slate-200 text-sm">{c.title}</p>
                    <StatusBadge status={c.status} />
                    {successId === c._id && (
                      <span className="text-xs text-emerald-400 font-medium">✅ Updated!</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{c.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        {c.user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-xs text-slate-400">{c.user?.name}</span>
                    </div>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{c.user?.email}</span>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="shrink-0">
                  <label className="block text-xs text-slate-500 mb-1.5 font-medium">Update Status</label>
                  <div className="flex gap-2 flex-wrap">
                    {STATUS_CYCLE.map((s) => (
                      <button
                        key={s}
                        id={`status-${c._id}-${s}`}
                        disabled={updatingId === c._id || c.status === s}
                        onClick={() => handleStatusChange(c._id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                          c.status === s
                            ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40 cursor-default'
                            : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {updatingId === c._id && c.status !== s ? (
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" />
                            {s.replace('-', ' ')}
                          </span>
                        ) : (
                          s.replace('-', ' ')
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageComplaintsPage;
