import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './Layout.css';
import { Suspense } from 'react';
import { Loader } from '../components/Loader';

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <main className="main_content">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
