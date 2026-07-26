import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Users,
  LayoutTemplate,
  Briefcase,
  Quote,
  ShieldAlert,
  LogOut,
  Download,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  X,
  Search,
  Eye,
  RefreshCw,
  TrendingUp,
  Mail,
  Phone,
  Building,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useContent } from '../context/ContentContext';
import DuckLogo from '../components/DuckLogo';

const COLORS = ['#06b6d4', '#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

const AdminDashboard = () => {
  const { content, updateContent } = useContent();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('analytics');
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  // Editable Form States
  const [heroForm, setHeroForm] = useState(content.hero || {});
  const [servicesForm, setServicesForm] = useState(content.services || []);
  const [testimonialsForm, setTestimonialsForm] = useState(content.testimonials || []);

  // Submissions State
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionFilter, setSubmissionFilter] = useState('All');
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Analytics State
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Security Form State
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Sync state when content updates
  useEffect(() => {
    if (content) {
      if (content.hero) setHeroForm(content.hero);
      if (content.services) setServicesForm(content.services);
      if (content.testimonials) setTestimonialsForm(content.testimonials);
    }
  }, [content]);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Submissions
  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    try {
      const token = localStorage.getItem('duck_admin_token');
      const res = await fetch('/api/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Fetch submissions error:', err);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  // Fetch Analytics Summary
  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const token = localStorage.getItem('duck_admin_token');
      const res = await fetch('/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Fetch analytics error:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'submissions') fetchSubmissions();
    if (activeTab === 'analytics') fetchAnalytics();
  }, [activeTab]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('duck_admin_token');
    localStorage.removeItem('duck_admin_user');
    navigate('/admin/login');
  };

  // Handle Update Content
  const handleSaveContent = async () => {
    setSaving(true);
    try {
      const updatedPayload = {
        ...content,
        hero: heroForm,
        services: servicesForm,
        testimonials: testimonialsForm,
      };

      await updateContent(updatedPayload);
      showToast('Website content updated and saved to database successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to save content', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Update Submission Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('duck_admin_token');
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        showToast(`Lead status updated to "${newStatus}"`);
        fetchSubmissions();
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  // Delete Submission
  const handleDeleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead submission entry?')) return;
    try {
      const token = localStorage.getItem('duck_admin_token');
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast('Lead submission deleted');
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
        fetchSubmissions();
      }
    } catch (err) {
      showToast('Failed to delete submission', 'error');
    }
  };

  // Export CSV Report
  const handleExportCSV = () => {
    const token = localStorage.getItem('duck_admin_token');
    window.open(`/api/analytics/export-csv?token=${token}`, '_blank');
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('duck_admin_token');
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      setPasswordSuccess('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = submissionFilter === 'All' || sub.status === submissionFilter;
    const matchesSearch =
      sub.name.toLowerCase().includes(submissionSearch.toLowerCase()) ||
      sub.email.toLowerCase().includes(submissionSearch.toLowerCase()) ||
      (sub.company && sub.company.toLowerCase().includes(submissionSearch.toLowerCase())) ||
      (sub.service && sub.service.toLowerCase().includes(submissionSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-200'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
            }`}
          >
            <CheckCircle2 size={20} className={toast.type === 'error' ? 'text-red-400' : 'text-emerald-400'} />
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Branding */}
          <div className="flex items-center gap-3 mb-8">
            <DuckLogo className="w-10 h-10 text-teal" />
            <div>
              <h1 className="font-bold text-lg text-white leading-tight">Duck Publicity</h1>
              <span className="text-xs text-teal font-semibold">Admin Workspace</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'analytics' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 size={18} />
              <span>Analytics & Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'submissions' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users size={18} />
              <span>Form Leads ({submissions.filter((s) => s.status === 'New').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'hero' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutTemplate size={18} />
              <span>Hero & Counters</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'services' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Briefcase size={18} />
              <span>Services Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'testimonials' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Quote size={18} />
              <span>Commitments</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'security' ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShieldAlert size={18} />
              <span>Security & Password</span>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          {['hero', 'services', 'testimonials'].includes(activeTab) && (
            <button
              onClick={handleSaveContent}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange to-amber-500 hover:from-orange/90 hover:to-amber-600 text-white rounded-xl font-bold text-sm shadow-lg disabled:opacity-50 transition"
            >
              <Save size={18} />
              <span>{saving ? 'Saving Changes...' : 'Save Site Changes'}</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 rounded-xl font-semibold text-sm transition"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* TAB 1: ANALYTICS & REPORTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Analytics & Performance Reports</h2>
                <p className="text-slate-400 text-sm mt-1">Real-time stats for form submissions, visitor traffic, and service demand</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAnalytics}
                  className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition"
                  title="Refresh Reports"
                >
                  <RefreshCw size={18} className={analyticsLoading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-teal hover:bg-teal/90 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal/20 transition"
                >
                  <Download size={18} />
                  <span>Export CSV Report</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Total Form Leads</span>
                  <div className="p-2 rounded-xl bg-teal/10 text-teal">
                    <Users size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{analytics?.metrics?.totalLeads || 0}</span>
                  <span className="text-xs text-teal font-semibold">({analytics?.metrics?.newLeads || 0} New)</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Page Views</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <Eye size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{analytics?.metrics?.pageViews || 0}</span>
                  <span className="text-xs text-emerald-400 font-semibold">+18.4%</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Resolved Clients</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{analytics?.metrics?.resolvedLeads || 0}</span>
                  <span className="text-xs text-slate-400">Conversions</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Conversion Rate</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{analytics?.metrics?.conversionRate || '0%'}</span>
                  <span className="text-xs text-amber-400 font-semibold">High ROI</span>
                </div>
              </div>
            </div>

            {/* Recharts Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart: Submissions Trend */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">Lead Submissions Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics?.submissionTrend || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" strokeWidth={1} tick={{ fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      <Line type="monotone" dataKey="count" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5, fill: '#06b6d4' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart: Service Demand */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">Most Requested Services</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics?.servicesBreakdown || [{ name: 'Performance Marketing', value: 5 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {(analytics?.servicesBreakdown || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      <Legend formatter={(value) => <span className="text-xs text-slate-300">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: Top Pages */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl lg:col-span-2">
                <h3 className="text-lg font-bold text-white mb-4">Website Page Views Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.popularPages || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="path" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Cookie Visitor Tracker Data Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-teal rounded-full animate-pulse" />
                    First-Party Cookie Visitor Logs
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Unique device cookie IDs, visit frequency, and campaign attribution (UTM parameters)</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block">Unique Devices</span>
                    <span className="font-bold text-teal text-sm">{analytics?.metrics?.uniqueCookieVisitors || 0}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <span className="text-slate-500 block">Returning Visitors</span>
                    <span className="font-bold text-amber-400 text-sm">{analytics?.metrics?.returningVisitors || 0}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 uppercase font-bold text-slate-400 tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Cookie Visitor ID</th>
                      <th className="py-3 px-4">Visit Count</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">UTM Source</th>
                      <th className="py-3 px-4">Current Page</th>
                      <th className="py-3 px-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(!analytics?.cookieLogs || analytics.cookieLogs.length === 0) ? (
                      <tr>
                        <td colSpan="6" className="text-center py-6 text-slate-500">
                          No cookie activity recorded yet.
                        </td>
                      </tr>
                    ) : (
                      analytics.cookieLogs.map((log, i) => (
                        <tr key={i} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-mono text-teal font-semibold">{log.visitor_id || 'v_unknown'}</td>
                          <td className="py-3 px-4">{log.visit_count} visit(s)</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full font-medium ${log.is_returning ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-teal/10 text-teal border border-teal/30'}`}>
                              {log.is_returning ? 'Returning' : 'New'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-200">{log.utm_source || 'Direct'}</td>
                          <td className="py-3 px-4 text-slate-400">{log.path}</td>
                          <td className="py-3 px-4 text-right text-slate-500 whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FORM SUBMISSIONS LEADS MANAGER */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Form Submissions & Leads</h2>
                <p className="text-slate-400 text-sm mt-1">Manage user contact and free audit requests directly stored in SQLite database</p>
              </div>
              <button
                onClick={fetchSubmissions}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition"
              >
                <RefreshCw size={16} className={submissionsLoading ? 'animate-spin' : ''} />
                <span>Refresh Leads</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search lead by name, email, company, service..."
                  value={submissionSearch}
                  onChange={(e) => setSubmissionSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                {['All', 'New', 'Contacted', 'Resolved'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSubmissionFilter(status)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                      submissionFilter === status ? 'bg-teal text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800/60 text-xs uppercase font-bold text-slate-400 tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Submitted Date</th>
                      <th className="py-4 px-6">Name & Company</th>
                      <th className="py-4 px-6">Contact Info</th>
                      <th className="py-4 px-6">Service Interested</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-500">
                          No lead submissions found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-400">
                            {new Date(sub.created_at).toLocaleDateString()} {new Date(sub.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white">{sub.name}</div>
                            {sub.company && <div className="text-xs text-slate-400 flex items-center gap-1"><Building size={12} /> {sub.company}</div>}
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-xs flex items-center gap-1 text-slate-300"><Mail size={12} /> {sub.email}</div>
                            {sub.phone && <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Phone size={12} /> {sub.phone}</div>}
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block bg-slate-800 border border-slate-700 text-teal text-xs px-2.5 py-1 rounded-full font-medium">
                              {sub.service || 'General Inquiry'}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={sub.status}
                              onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                                sub.status === 'New'
                                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                                  : sub.status === 'Contacted'
                                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                                  : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                              }`}
                            >
                              <option value="New" className="bg-slate-900 text-amber-400">New</option>
                              <option value="Contacted" className="bg-slate-900 text-blue-400">Contacted</option>
                              <option value="Resolved" className="bg-slate-900 text-emerald-400">Resolved</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="p-2 bg-slate-800 hover:bg-teal hover:text-white rounded-lg text-slate-400 transition"
                              title="View Full Message"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="p-2 bg-slate-800 hover:bg-red-500 hover:text-white rounded-lg text-slate-400 transition"
                              title="Delete Submission"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submission Detail Modal */}
            {selectedSubmission && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="absolute top-5 right-5 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>

                  <div>
                    <span className="text-xs font-semibold text-teal uppercase">Lead Message Details</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{selectedSubmission.name}</h3>
                    <p className="text-xs text-slate-400">Submitted on {new Date(selectedSubmission.created_at).toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Email</span>
                      <span className="text-white font-medium">{selectedSubmission.email}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Phone</span>
                      <span className="text-white font-medium">{selectedSubmission.phone || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Company</span>
                      <span className="text-white font-medium">{selectedSubmission.company || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Requested Service</span>
                      <span className="text-teal font-medium">{selectedSubmission.service}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 font-semibold block mb-2">Message Body:</span>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                      {selectedSubmission.message || 'No message provided.'}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HERO & METRICS EDITOR */}
        {activeTab === 'hero' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Hero & Counter Metrics Editor</h2>
              <p className="text-slate-400 text-sm mt-1">Update website taglines, hero title, subheadline, and live counters</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Top Tagline</label>
                <input
                  type="text"
                  value={heroForm.tagline || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Main Headline</label>
                <input
                  type="text"
                  value={heroForm.mainHeadline || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, mainHeadline: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Subheadline Paragraph</label>
                <textarea
                  rows="3"
                  value={heroForm.subheadline || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal text-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Counter Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(heroForm.metrics || []).map((m, idx) => (
                    <div key={m.id || idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div>
                        <label className="text-xs text-slate-400">Metric Label</label>
                        <input
                          type="text"
                          value={m.label}
                          onChange={(e) => {
                            const newMetrics = [...heroForm.metrics];
                            newMetrics[idx].label = e.target.value;
                            setHeroForm({ ...heroForm, metrics: newMetrics });
                          }}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs mt-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <label className="text-xs text-slate-400">Prefix (+)</label>
                          <input
                            type="text"
                            value={m.prefix || ''}
                            onChange={(e) => {
                              const newMetrics = [...heroForm.metrics];
                              newMetrics[idx].prefix = e.target.value;
                              setHeroForm({ ...heroForm, metrics: newMetrics });
                            }}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs mt-1"
                          />
                        </div>
                        <div className="w-2/3">
                          <label className="text-xs text-slate-400">Value (120%)</label>
                          <input
                            type="text"
                            value={m.value}
                            onChange={(e) => {
                              const newMetrics = [...heroForm.metrics];
                              newMetrics[idx].value = e.target.value;
                              setHeroForm({ ...heroForm, metrics: newMetrics });
                            }}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-teal font-bold text-xs mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES MANAGER */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Services Manager</h2>
                <p className="text-slate-400 text-sm mt-1">Add, edit, or remove service cards displayed on the main website</p>
              </div>
              <button
                onClick={() =>
                  setServicesForm([
                    ...servicesForm,
                    {
                      id: Date.now(),
                      title: 'New Service',
                      description: 'Service description goes here.',
                      results: '100% Growth',
                      iconName: 'Zap',
                    },
                  ])
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-teal hover:bg-teal/90 text-white rounded-xl font-bold text-sm shadow-lg"
              >
                <Plus size={18} />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesForm.map((serv, index) => (
                <div key={serv.id || index} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative shadow-xl">
                  <button
                    onClick={() => setServicesForm(servicesForm.filter((_, i) => i !== index))}
                    className="absolute top-5 right-5 p-2 text-slate-500 hover:text-red-400"
                    title="Remove Service"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Service Title</label>
                    <input
                      type="text"
                      value={serv.title}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[index].title = e.target.value;
                        setServicesForm(updated);
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={serv.description}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[index].description = e.target.value;
                        setServicesForm(updated);
                      }}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Highlight Result Metric</label>
                    <input
                      type="text"
                      value={serv.results}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[index].results = e.target.value;
                        setServicesForm(updated);
                      }}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-teal font-bold text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TESTIMONIALS & COMMITMENTS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Why Work With Us / Commitments</h2>
                <p className="text-slate-400 text-sm mt-1">Manage core promises and client testimonial cards</p>
              </div>
              <button
                onClick={() =>
                  setTestimonialsForm([
                    ...testimonialsForm,
                    {
                      id: Date.now(),
                      title: 'New Commitment',
                      description: 'Details of commitment...',
                      iconName: 'ShieldCheck',
                    },
                  ])
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-teal text-white rounded-xl font-bold text-sm shadow-lg"
              >
                <Plus size={18} />
                <span>Add Commitment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonialsForm.map((item, index) => (
                <div key={item.id || index} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative shadow-xl">
                  <button
                    onClick={() => setTestimonialsForm(testimonialsForm.filter((_, i) => i !== index))}
                    className="absolute top-5 right-5 p-2 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...testimonialsForm];
                        updated[index].title = e.target.value;
                        setTestimonialsForm(updated);
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...testimonialsForm];
                        updated[index].description = e.target.value;
                        setTestimonialsForm(updated);
                      }}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-8 max-w-xl">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Security & Password Settings</h2>
              <p className="text-slate-400 text-sm mt-1">Change your administrator login password</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
              {passwordError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                  {passwordSuccess}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal hover:bg-teal/90 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal/20 transition"
                >
                  Update Admin Password
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
