import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import SkinDetailPage from './pages/SkinDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/dota2" element={<CatalogPage />} />
      <Route path="/cs2" element={<CatalogPage />} />
      <Route path="/skin/:id" element={<SkinDetailPage />} />
    </Routes>
  );
}

export default App;