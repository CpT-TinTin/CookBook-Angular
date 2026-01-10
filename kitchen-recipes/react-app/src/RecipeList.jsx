import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function RecipeList() {
    const [selectedCategory, setSelectedCategory] = useState('Toate');
    const [searchTerm, setSearchTerm] = useState('');
    const categories = ['Toate', 'Paste', 'Salate', 'Desert', 'Mic Dejun'];

    const [recipes, setRecipes] = useState([
        {
            id: 1,
            title: 'Paste Carbonara',
            description: 'O rețetă clasică italiană cu ouă, brânză, pancetta și piper.',
            cookingTime: 20,
            imageUrl: 'https://placehold.co/600x400?text=Carbonara',
            isFavorite: true,
            category: 'Paste'
        },
        {
            id: 2,
            title: 'Salată Caesar',
            description: 'Salată proaspătă cu crutoane, parmezan și sos special.',
            cookingTime: 15,
            imageUrl: 'https://placehold.co/600x400?text=Caesar',
            isFavorite: false,
            category: 'Salate'
        },
        {
            id: 3,
            title: 'Tiramisu',
            description: 'Desert elegant cu pișcoturi, cafea și mascarpone.',
            cookingTime: 45,
            imageUrl: 'https://placehold.co/600x400?text=Tiramisu',
            isFavorite: true,
            category: 'Desert'
        }
    ]);

    const filteredRecipes = recipes.filter(recipe => {
        const matchesCategory = selectedCategory === 'Toate' || recipe.category === selectedCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container">
            <header className="page-header">
                <div className="header-content" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                    <h1>Rețete de Bucătărie</h1>
                    <div className="search-bar" style={{ flex: 1, maxWidth: '400px' }}>
                        <input
                            type="text"
                            placeholder="Caută rețete..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                            style={{
                                width: '100%',
                                padding: '0.8rem 1.2rem',
                                border: '1px solid #e1e4e8',
                                borderRadius: '50px',
                                fontSize: '0.95rem',
                                background: 'var(--card-bg)',
                                color: 'var(--text-color)',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
                <button className="add-btn">+ Adaugă Rețetă</button>
            </header>

            <div className="categories-wrapper" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
                <div className="categories" style={{ display: 'flex', gap: '0.8rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                background: selectedCategory === cat ? 'var(--secondary-color)' : 'var(--card-bg)',
                                color: selectedCategory === cat ? 'white' : 'var(--text-light)',
                                border: selectedCategory === cat ? '1px solid var(--secondary-color)' : '1px solid #e1e4e8',
                                padding: '0.5rem 1.2rem',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="recipe-grid">
                {filteredRecipes.map(recipe => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <RecipeCard
                            title={recipe.title}
                            imageUrl={recipe.imageUrl}
                            description={recipe.description}
                            cookingTime={recipe.cookingTime}
                            isFavorite={recipe.isFavorite}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;
