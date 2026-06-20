import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyComplaints } from '../../api/complaintApi';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';

const MyComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getMyComplaints()
      .then((res) => setComplaints(res.data.complaints))
      .catch(() => setError('Failed to load complaints.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === 'all' ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Complaints</h1>
          <p className="text-slate-400 mt-1 text-sm">{complaints.length} complaint(s) total</p>
        </div>
        <Link
          id="create-new-btn"
          to="/dashboard/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg transition-all duration-150 shrink-0"
        >
          ✏️ New
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'in-progress', 'resolved'].map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
              filter === f
                ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-300 hover:bg-slate-700/60'
            }`}
          >
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900/40 border border-dashed border-slate-700/60 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-400 text-sm">No complaints found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c._id}
              id={`complaint-${c._id}`}
              className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-5 hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-200 text-sm">{c.title}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{c.description}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Submitted {new Date(c.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyComplaintsPage;
