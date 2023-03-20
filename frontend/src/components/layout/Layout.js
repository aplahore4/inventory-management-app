import React, { Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className='--pad' style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
