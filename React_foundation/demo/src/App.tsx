import { Route, Routes } from 'react-router-dom';
import Products from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import ProductSearch from './pages/Product/ProductSearch';
import Todo from './pages/Todo';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/products/search' element={<ProductSearch />} />
        <Route path='*' element={<div>404</div>} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </>
  );
}
// What happens if setState is called during rendering?

export default App;
