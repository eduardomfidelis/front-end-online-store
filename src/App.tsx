import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/cart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/carrinho" element={ <CartPage /> } />
        <Route path="/product/:id" element={ <ProductDetails /> } />
      </Routes>
    </div>
  );
}

export default App;
