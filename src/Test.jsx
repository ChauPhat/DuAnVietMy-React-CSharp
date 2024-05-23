// src/App.js
import React from 'react';
// import './App.css';
import ProductList from './context/ProductList';

function Test() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React and ASP.NET Core App</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default Test;
