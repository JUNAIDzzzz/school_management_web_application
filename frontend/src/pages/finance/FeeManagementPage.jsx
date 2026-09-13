import PageHeader from '../../components/dashboard/PageHeader';
import FeeRecordsTable from '../../components/dashboard/FeeRecordsTable';

export default function FeeManagementPage() {
  return (
    <div>
      <PageHeader title="Fee Management" description="Mark fees as paid and correct payment records." />
      <FeeRecordsTable mode="manage" />
    </div>
  );
}
