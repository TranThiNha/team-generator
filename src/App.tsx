import { Layout, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import './index.scss';
import Home from './app/home';

function App() {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        ></Header>

        <Home />
      </Layout>
    </Space>
  );
}

export default App;
