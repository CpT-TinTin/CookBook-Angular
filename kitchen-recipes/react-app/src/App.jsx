import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import ShoppingList from './ShoppingList';
import { ShoppingListProvider } from './ShoppingListContext';
import './index.css';

function App() {
  return (
    <ShoppingListProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              {/* Fallback route */}
              <Route path="*" element={<RecipeList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ShoppingListProvider>
  );
}

export default App;
