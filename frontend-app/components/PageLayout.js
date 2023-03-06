import Layout from '@/components/common/Layout';
import Header from '@/components/Header';

const PageLayout = ({ children }) => {
  return (
    <Layout header={<Header />} s>
      {children}
    </Layout>
  );
};

export default PageLayout;
