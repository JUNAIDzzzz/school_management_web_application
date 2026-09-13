import { useEffect, useMemo, useState } from 'react';
import { FiCheckCircle, FiEdit2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DataTable from './DataTable';
import Toolbar, { SearchInput, SelectFilter } from './Toolbar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { getFees, markFeePaid, updateFeeRecord } from '../../services/feeService';
import { getClasses } from '../../services/classService';
import { MONTHS, CURRENT_MONTH, CURRENT_YEAR, PAYMENT_STATUSES } from '../../data/constants';

const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;
const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—');

// Shared fee-records view used by: Admin's read-only Fee Overview,
// Finance's read-only Student Fee List, and Finance's Fee Management (actionable).
export default function FeeRecordsTable({ mode = 'view' }) {
  const [classes, setClasses] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ month: CURRENT_MONTH, year: CURRENT_YEAR, classId: '', status: 'All', search: '' });
  const [editRecord, setEditRecord] = useState(null);
  const [editForm, setEditForm] = useState({ amount: '', paymentStatus: 'Unpaid', paymentDate: '' });
  const [saving, setSaving] = useState(false);
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    getClasses().then((data) => setClasses(data.classes)).catch(() => {});
  }, []);

  const loadFees = async () => {
    setLoading(true);
    try {
      const params = {
        month: filters.month,
        year: filters.year,
        status: filters.status,
        search: filters.search || undefined,
        classId: filters.classId || undefined,
      };
      const data = await getFees(params);
      setRecords(data.records);
    } catch {
      toast.error('Failed to load fee records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(loadFees, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.month, filters.year, filters.classId, filters.status, filters.search]);

  const rows = useMemo(
    () => records.map((r) => ({ ...r, _id: r.id || `${r.student.id}_${r.month}_${r.year}` })),
    [records]
  );

  const handleMarkPaid = async (record) => {
    setMarkingId(record._id);
    try {
      await markFeePaid({ studentId: record.student.id, month: record.month, year: record.year });
      toast.success(`Marked ${record.student.name}'s fee as paid`);
      loadFees();
    } catch {
      toast.error('Could not update payment status');
    } finally {
      setMarkingId(null);
    }
  };

  const openEdit = (record) => {
    setEditRecord(record);
    setEditForm({
      amount: record.amount,
      paymentStatus: record.paymentStatus,
      paymentDate: record.paymentDate ? record.paymentDate.slice(0, 10) : '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editRecord.id) {
      // No persisted record yet for this student/month — create it via mark-paid style upsert.
      setSaving(true);
      try {
        await markFeePaid({
          studentId: editRecord.student.id,
          month: editRecord.month,
          year: editRecord.year,
          paymentDate: editForm.paymentDate || undefined,
        });
        toast.success('Fee record updated');
        setEditRecord(null);
        loadFees();
      } catch {
        toast.error('Could not save changes');
      } finally {
        setSaving(false);
      }
      return;
    }

    setSaving(true);
    try {
      await updateFeeRecord(editRecord.id, {
        amount: Number(editForm.amount),
        paymentStatus: editForm.paymentStatus,
        paymentDate: editForm.paymentDate || undefined,
      });
      toast.success('Fee record updated');
      setEditRecord(null);
      loadFees();
    } catch {
      toast.error('Could not save changes');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: 'name', header: 'Student', render: (r) => (
      <div>
        <p className="font-medium text-slate-800">{r.student.name}</p>
        <p className="text-xs text-slate-400">{r.student.admissionNumber}</p>
      </div>
    ) },
    { key: 'class', header: 'Class', render: (r) => r.class?.name },
    { key: 'studentType', header: 'Type' },
    { key: 'amount', header: 'Monthly Fee', render: (r) => formatCurrency(r.amount) },
    { key: 'paymentStatus', header: 'Status', render: (r) => (
      <Badge tone={r.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}>{r.paymentStatus}</Badge>
    ) },
    { key: 'paymentDate', header: 'Payment Date', render: (r) => formatDate(r.paymentDate) },
    ...(mode === 'manage'
      ? [{
          key: 'actions',
          header: 'Actions',
          render: (r) => (
            <div className="flex items-center gap-2">
              {r.paymentStatus === 'Unpaid' && (
                <Button size="sm" variant="primary" loading={markingId === r._id} onClick={() => handleMarkPaid(r)}>
                  <FiCheckCircle size={14} /> Mark Paid
                </Button>
              )}
              <Button size="sm" variant="secondary" onClick={() => openEdit(r)}>
                <FiEdit2 size={14} /> Edit
              </Button>
            </div>
          ),
        }]
      : []),
  ];

  return (
    <div>
      <Toolbar>
        <SearchInput value={filters.search} onChange={(v) => setFilters((f) => ({ ...f, search: v }))} placeholder="Search by name or ID..." />
        <SelectFilter
          label="Month"
          value={filters.month}
          onChange={(v) => setFilters((f) => ({ ...f, month: v }))}
          options={MONTHS.map((m) => ({ value: m, label: m }))}
        />
        <SelectFilter
          label="Class"
          value={filters.classId}
          onChange={(v) => setFilters((f) => ({ ...f, classId: v }))}
          options={[{ value: '', label: 'All Classes' }, ...classes.map((c) => ({ value: c._id, label: c.name }))]}
        />
        <SelectFilter
          label="Status"
          value={filters.status}
          onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
          options={PAYMENT_STATUSES.map((s) => ({ value: s, label: s === 'All' ? 'All Statuses' : s }))}
        />
      </Toolbar>

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyTitle="No fee records match your filters"
        emptyDescription="Try adjusting the month, class, or status filters."
      />

      <Modal
        open={Boolean(editRecord)}
        onClose={() => setEditRecord(null)}
        title={`Edit Fee Record — ${editRecord?.student?.name || ''}`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditRecord(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} loading={saving}>Save Changes</Button>
          </>
        }
      >
        {editRecord && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Amount (₹)</label>
              <input
                type="number"
                min="0"
                value={editForm.amount}
                onChange={(e) => setEditForm((f) => ({ ...f, amount: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Payment Status</label>
              <select
                value={editForm.paymentStatus}
                onChange={(e) => setEditForm((f) => ({ ...f, paymentStatus: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Payment Date</label>
              <input
                type="date"
                value={editForm.paymentDate}
                onChange={(e) => setEditForm((f) => ({ ...f, paymentDate: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
