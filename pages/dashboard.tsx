import React, { FC } from 'react';
import Layout from '../components/Layout/Layout';
import { Welcome } from '../components/Welcome/Welcome';

const Dashboard: FC = (props) => {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
