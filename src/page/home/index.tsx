import React from 'react';
import Viewport from '../../components/viewport';
import './index.less';

const Home = () => {
  return (
    <div className="home-wrap">
      <div className="home-left">
        <div className="viewport">
          <Viewport />
        </div>
        <div className="tool"></div>
      </div>
      <div className="home-right"></div>
    </div>
  );
};

export default Home;
