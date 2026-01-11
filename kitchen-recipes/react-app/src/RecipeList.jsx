import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { recipes as initialRecipes } from './data';
import { useShoppingList } from './ShoppingListContext';
import AddRecipeModal from './AddRecipeModal';

function RecipeList() {
    const [selectedCategory, setSelectedCategory] = useState('Toate');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const categories = ['Toate', 'Paste', 'Salate', 'Desert', 'Mic Dejun'];
    const { addItems } = useShoppingList();

    const [recipes, setRecipes] = useState(initialRecipes);

    const filteredRecipes = recipes.filter(recipe => {
        const matchesCategory = selectedCategory === 'Toate' || recipe.category === selectedCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddRecipe = (newRecipe) => {
        const recipeWithId = { ...newRecipe, id: Date.now(), isFavorite: false };
        setRecipes([...recipes, recipeWithId]);
        setIsModalOpen(false);
    };

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
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>+ Adaugă Rețetă</button>
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
                            onAddToShoppingList={(e) => {
                                e.preventDefault();
                                addItems(recipe.ingredients);
                                alert('Ingrediente adăugate în lista de cumpărături!');
                            }}
                        />
                    </Link>
                ))}
            </div>

            {isModalOpen && (
                <AddRecipeModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddRecipe}
                />
            )}
        </div>
    );
}

export default RecipeList;
