import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllComplaints } from '../../api/complaintApi';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllComplaints()
      .then((res) => setComplaints(res.data.complaints))
      .catch(() => setError('Failed to load complaints.'))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'pending').length,
    'in-progress': complaints.filter((c) => c.status === 'in-progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  };

  const recent = complaints.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard 📊</h1>
        <p className="text-gray-500 mt-1 text-sm">Overview of all complaints across the platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-amber-700/80 uppercase tracking-widest mb-1">Pending</p>
          <p className="text-3xl font-bold text-amber-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-blue-700/80 uppercase tracking-widest mb-1">In Progress</p>
          <p className="text-3xl font-bold text-blue-700">{stats['in-progress']}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-emerald-700/80 uppercase tracking-widest mb-1">Resolved</p>
          <p className="text-3xl font-bold text-emerald-700">{stats.resolved}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Complaints</h2>
          <Link to="/admin/manage" className="text-xs text-blue-600 hover:text-blue-700 transition font-medium">
            Manage all →
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : recent.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 text-sm">No complaints yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((c) => (
              <div
                key={c._id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-gray-300 transition shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm truncate">{c.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {c.user?.name} · {c.user?.email}
                  </p>
                </div>
                <div className="ml-4 shrink-0">
                  <StatusBadge status={c.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
