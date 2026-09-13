import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHeader from '../../components/dashboard/PageHeader';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Badge from '../../components/common/Badge';
import { getFinanceUsers, createFinanceUser, updateFinanceUser, deleteFinanceUser } from '../../services/financeUserService';

const EMPTY_FORM = { name: '', email: '', password: '', phone: '', status: 'active' };

export default function FinanceUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getFinanceUsers();
      setUsers(data.users);
    } catch {
      toast.error('Failed to load finance users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditingId(user._id);
    setForm({ name: user.name, email: user.email, password: '', phone: user.phone || '', status: user.status });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await updateFinanceUser(editingId, payload);
        toast.success('Finance user updated');
      } else {
        await createFinanceUser(form);
        toast.success('Finance user added');
      }
      setModalOpen(false);
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteFinanceUser(deleteTarget._id);
      toast.success('Finance user removed');
      setDeleteTarget(null);
      loadUsers();
    } catch {
      toast.error('Could not remove finance user');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'name', header: 'Name', render: (u) => (
      <div>
        <p className="font-medium text-slate-800">{u.name}</p>
        <p className="text-xs text-slate-400">{u.email}</p>
      </div>
    ) },
    { key: 'phone', header: 'Phone', render: (u) => u.phone || '—' },
    { key: 'status', header: 'Status', render: (u) => (
      <Badge tone={u.status === 'active' ? 'active' : 'inactive'}>{u.status}</Badge>
    ) },
    { key: 'actions', header: 'Actions', render: (u) => (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => openEdit(u)}>
          <FiEdit2 size={14} /> Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => setDeleteTarget(u)}>
          <FiTrash2 size={14} />
        </Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader
        title="Finance User Management"
        description="Add and manage staff who can access the Finance portal."
        action={
          <Button onClick={openCreate}>
            <FiUserPlus size={16} /> Add Finance User
          </Button>
        }
      />

      <DataTable
        columns={columns}
        rows={users}
        loading={loading}
        emptyTitle="No finance users yet"
        emptyDescription="Add a finance user so they can manage student fees."
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Finance User' : 'Add Finance User'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} loading={saving}>{editingId ? 'Save Changes' : 'Add User'}</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              required
              type="email"
              disabled={Boolean(editingId)}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Password {editingId && <span className="text-xs text-slate-400">(leave blank to keep unchanged)</span>}
            </label>
            <input
              required={!editingId}
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          {editingId && (
            <div>
              <label className="text-sm font-medium text-slate-600">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove finance user?"
        message={`This will permanently remove ${deleteTarget?.name} and revoke their access.`}
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
