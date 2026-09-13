import PageHeader from '../../components/dashboard/PageHeader';
import FeeRecordsTable from '../../components/dashboard/FeeRecordsTable';

export default function StudentFeeListPage() {
  return (
    <div>
      <PageHeader title="Student Fee List" description="Browse every student's monthly fee status." />
      <FeeRecordsTable mode="view" />
    </div>
  );
}
