import AuthGuard from '@/components/AuthGuard';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <AuthGuard>
      {(userId) => <Dashboard userId={userId} />}
    </AuthGuard>
  );
};

export default Index;
