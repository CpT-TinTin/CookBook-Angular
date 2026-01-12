import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShoppingList } from './ShoppingListContext';
import { recipes as allRecipes } from './data';
import { useToast } from './ToastContext';

function RecipeDetail() {
    const { id } = useParams();
    const { addItems } = useShoppingList();
    const { showToast } = useToast();

    // Find recipe by ID
    const recipe = allRecipes.find(r => r.id === parseInt(id));

    if (!recipe) {
        return <div className="container"><h2>Rețeta nu a fost găsită!</h2><Link to="/">Înapoi la listă</Link></div>;
    }

    const handleAddToShoppingList = () => {
        addItems(recipe.ingredients);
        showToast('Ingrediente adăugate în lista de cumpărături!', 'success');
    };

    return (
        <div className="recipe-detail-container">
            <div className="detail-header">
                <Link to="/" className="back-link">← Înapoi</Link>
                <div className="actions">
                    <button className="icon-btn">❤️</button>
                    <button className="icon-btn" onClick={handleAddToShoppingList} title="Adaugă la lista de cumpărături">🛒</button>
                    <button className="icon-btn" onClick={() => window.print()}>🖨️</button>
                </div>
            </div>

            <article className="recipe-article">
                <img src={recipe.imageUrl} alt={recipe.title} className="detail-hero-image" />

                <div className="content-wrapper">
                    <h1 className="recipe-title">{recipe.title}</h1>
                    <p className="recipe-intro">{recipe.description}</p>

                    <div className="recipe-sections">
                        <section className="ingredients">
                            <h3>Ingrediente</h3>
                            <ul>
                                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </section>

                        <section className="steps">
                            <h3>Mod de preparare</h3>
                            <ol>
                                {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </section>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default RecipeDetail;
