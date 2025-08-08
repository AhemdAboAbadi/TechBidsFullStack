import React from 'react';
import NavBar from '../../Components/Common/NavBar';
import Footer from '../../Components/Common/Footer';
import Header from '../../Components/Header';
import LastAuction from '../../Components/Common/LastAuction';

const Home: React.FC = (): any => (
  <div className="home-container">
    <NavBar />
    <div className="main-content">
      <Header />
      <LastAuction />
    </div>
    <Footer />
  </div>
);

export default Home;
