import { Route, Routes } from 'react-router-dom';
import Products from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
      </Routes>
    </>
  );
}
// What happens if setState is called during rendering?

export default App;
