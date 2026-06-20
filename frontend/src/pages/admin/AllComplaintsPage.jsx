import { useEffect, useState } from 'react';
import { getAllComplaints } from '../../api/complaintApi';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';

const AllComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getAllComplaints()
      .then((res) => setComplaints(res.data.complaints))
      .catch(() => setError('Failed to load complaints.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = complaints
    .filter((c) => filter === 'all' || c.status === filter)
    .filter(
      (c) =>
        search === '' ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.email?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">All Complaints 📁</h1>
        <p className="text-slate-400 mt-1 text-sm">{complaints.length} complaints from all users.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          id="search-complaints"
          type="text"
          placeholder="Search by title, user name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-900/60 border border-slate-800/60 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
        />
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'in-progress', 'resolved'].map((f) => (
            <button
              key={f}
              id={`admin-filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                filter === f
                  ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-300'
              }`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900/40 border border-dashed border-slate-700/60 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-400 text-sm">No complaints match your search.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Title</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">User</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((c) => (
                <tr key={c._id} id={`row-${c._id}`} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-200 truncate max-w-xs">{c.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{c.description}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-slate-300">{c.user?.name}</p>
                    <p className="text-xs text-slate-500">{c.user?.email}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllComplaintsPage;
