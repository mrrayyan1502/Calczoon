import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const Layout = () => {
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <div className="flex-grow w-full">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            {showBreadcrumbs && <Breadcrumbs />}
            <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;