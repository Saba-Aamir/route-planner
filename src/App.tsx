import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/search-results" element={<SearchResult/>}/> 
          <Route path="/" element={<Home/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;