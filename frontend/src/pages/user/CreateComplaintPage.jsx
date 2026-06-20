import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComplaint } from '../../api/complaintApi';
import DashboardLayout from '../../components/DashboardLayout';

const CreateComplaintPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createComplaint(form);
      navigate('/dashboard/my-complaints');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Submit a Complaint</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Describe your issue clearly so our team can assist you promptly.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 shadow-xl">
          {error && (
            <div
              id="create-error"
              className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2"
            >
              <span className="mt-0.5">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1.5">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Brief summary of the issue"
                className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Please provide detailed information about your complaint…"
                className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                id="submit-complaint-btn"
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Submitting…
                  </>
                ) : (
                  '📤 Submit Complaint'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 font-medium text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateComplaintPage;
