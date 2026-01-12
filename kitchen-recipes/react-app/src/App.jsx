import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import ShoppingList from './ShoppingList';
import { ShoppingListProvider } from './ShoppingListContext';
import { ToastProvider } from './ToastContext';
import './index.css';

function App() {
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}

export default App;
