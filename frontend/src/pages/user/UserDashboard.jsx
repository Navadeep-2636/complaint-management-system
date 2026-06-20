import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyComplaints } from '../../api/complaintApi';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';

const statColors = {
  pending: 'bg-amber-50 border-amber-200 text-amber-700',
  'in-progress': 'bg-blue-50 border-blue-200 text-blue-700',
  resolved: 'bg-emerald-50 border-emerald-200 text-emerald-700',
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyComplaints()
      .then((res) => setComplaints(res.data.complaints))
      .catch(() => setError('Failed to load your complaints.'))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'pending').length,
    'in-progress': complaints.filter((c) => c.status === 'in-progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  };

  const recent = complaints.slice(0, 3);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good day, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">Here's an overview of your complaints.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        {['pending', 'in-progress', 'resolved'].map((s) => (
          <div
            key={s}
            className={`${statColors[s]} border rounded-2xl p-5 shadow-sm`}
          >
            <p className="text-xs uppercase tracking-widest mb-1 opacity-80">
              {s.replace('-', ' ')}
            </p>
            <p className="text-3xl font-bold">{stats[s]}</p>
          </div>
        ))}
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Link
          id="quick-create-btn"
          to="/dashboard/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-sm transition-colors duration-150"
        >
          ✏️ New Complaint
        </Link>
      </div>

      {/* Recent Complaints */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Complaints</h2>
          <Link to="/dashboard/my-complaints" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition">
            View all →
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
            <Link to="/dashboard/create" className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 inline-block transition">
              Submit your first complaint →
            </Link>
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
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{c.description}</p>
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

export default UserDashboard;
