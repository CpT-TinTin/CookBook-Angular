import React from 'react';
import RecipeCard from './RecipeCard';
import './App.css';

function App() {
  const recipes = [
    {
      id: 1,
      title: 'Paste Carbonara',
      imageUrl: 'https://placehold.co/600x400?text=Carbonara'
    },
    {
      id: 2,
      title: 'Salată Caesar',
      imageUrl: 'https://placehold.co/600x400?text=Caesar'
    },
    {
      id: 3,
      title: 'Tiramisu',
      imageUrl: 'https://placehold.co/600x400?text=Tiramisu'
    }
  ];

  return (
    <div className="app-container">
      <h1>Rețete Favorite (React Minimal)</h1>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
