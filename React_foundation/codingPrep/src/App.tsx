// import React from 'react';

import { Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blogs from './components/Gallery';
import Gallery from './components/Gallery';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/blog/:id' element={<div>Product:id</div>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
