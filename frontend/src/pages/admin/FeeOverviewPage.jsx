import PageHeader from '../../components/dashboard/PageHeader';
import FeeRecordsTable from '../../components/dashboard/FeeRecordsTable';

export default function FeeOverviewPage() {
  return (
    <div>
      <PageHeader title="Fee Overview" description="View student fee status across classes and months." />
      <FeeRecordsTable mode="view" />
    </div>
  );
}
