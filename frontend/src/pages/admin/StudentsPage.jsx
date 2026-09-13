import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHeader from '../../components/dashboard/PageHeader';
import Toolbar, { SearchInput, SelectFilter } from '../../components/dashboard/Toolbar';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Badge from '../../components/common/Badge';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../services/studentService';
import { getClasses } from '../../services/classService';
import { STUDENT_TYPES } from '../../data/constants';

const EMPTY_FORM = { name: '', admissionNumber: '', parentName: '', contactNumber: '', class: '', studentType: 'Day Scholar' };

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getClasses().then((data) => setClasses(data.classes)).catch(() => {});
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents({ search: search || undefined, classId: classFilter || undefined, limit: 100 });
      setStudents(data.students);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(loadStudents, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, classFilter]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, class: classes[0]?._id || '' });
    setModalOpen(true);
  };

  const openEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      admissionNumber: student.admissionNumber,
      parentName: student.parentName,
      contactNumber: student.contactNumber,
      class: student.class?._id,
      studentType: student.studentType,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateStudent(editingId, form);
        toast.success('Student updated successfully');
      } else {
        await createStudent(form);
        toast.success('Student added successfully');
      }
      setModalOpen(false);
      loadStudents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteStudent(deleteTarget._id);
      toast.success('Student removed');
      setDeleteTarget(null);
      loadStudents();
    } catch {
      toast.error('Could not remove student');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'name', header: 'Name', render: (s) => (
      <div>
        <p className="font-medium text-slate-800">{s.name}</p>
        <p className="text-xs text-slate-400">{s.admissionNumber}</p>
      </div>
    ) },
    { key: 'class', header: 'Class', render: (s) => s.class?.name },
    { key: 'studentType', header: 'Type', render: (s) => (
      <Badge tone={s.studentType === 'Hostler' ? 'neutral' : 'active'}>{s.studentType}</Badge>
    ) },
    { key: 'parentName', header: 'Parent / Guardian' },
    { key: 'contactNumber', header: 'Contact' },
    { key: 'actions', header: 'Actions', render: (s) => (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => openEdit(s)}>
          <FiEdit2 size={14} /> Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => setDeleteTarget(s)}>
          <FiTrash2 size={14} />
        </Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader
        title="Student Management"
        description="Add, edit, search, and organize students by class."
        action={
          <Button onClick={openCreate}>
            <FiUserPlus size={16} /> Add Student
          </Button>
        }
      />

      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or admission no..." />
        <SelectFilter
          label="Class"
          value={classFilter}
          onChange={setClassFilter}
          options={[{ value: '', label: 'All Classes' }, ...classes.map((c) => ({ value: c._id, label: c.name }))]}
        />
      </Toolbar>

      <DataTable
        columns={columns}
        rows={students}
        loading={loading}
        emptyTitle="No students found"
        emptyDescription="Try a different search or add a new student to get started."
        emptyAction={
          <Button size="sm" onClick={openCreate}>
            <FiPlus size={14} /> Add Student
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Student' : 'Add Student'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} loading={saving}>{editingId ? 'Save Changes' : 'Add Student'}</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Student Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Admission Number</label>
            <input
              required
              value={form.admissionNumber}
              onChange={(e) => setForm((f) => ({ ...f, admissionNumber: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Parent / Guardian Name</label>
            <input
              required
              value={form.parentName}
              onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Contact Number</label>
            <input
              required
              value={form.contactNumber}
              onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Class</label>
              <select
                required
                value={form.class}
                onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              >
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Student Type</label>
              <select
                value={form.studentType}
                onChange={(e) => setForm((f) => ({ ...f, studentType: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              >
                {STUDENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove student?"
        message={`This will permanently remove ${deleteTarget?.name} from the system.`}
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
