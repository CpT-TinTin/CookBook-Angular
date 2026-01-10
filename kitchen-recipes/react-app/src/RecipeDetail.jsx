import React from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
    const { id } = useParams();

    // Mock data lookup (in a real app, fetch from API/Context)
    const recipes = {
        1: {
            title: 'Paste Carbonara',
            imageUrl: 'https://placehold.co/800x400?text=Carbonara',
            description: 'O rețetă clasică italiană cu ouă, brânză, pancetta și piper.',
            ingredients: ['400g spaghete', '150g guanciale/pancetta', '4 gălbenușuri', '100g Pecorino Romano', 'Piper negru proaspăt măcinat'],
            steps: ['Fierbeți pastele în apă cu sare.', 'Prăjiți guanciale până devine crocant.', 'Amestecați gălbenușurile cu brânza și piperul.', 'Combinați pastele fierbinți cu amestecul de ouă și guanciale.']
        },
        2: {
            title: 'Salată Caesar',
            imageUrl: 'https://placehold.co/800x400?text=Caesar',
            description: 'Salată proaspătă cu crutoane, parmezan și sos special.',
            ingredients: ['Salată Romaine', 'Crutoane', 'Parmezan', 'Piept de pui (opțional)', 'Sos Caesar'],
            steps: ['Spălați și rupeți salata.', 'Adăugați crutoanele și parmezanul.', 'Turnați sosul și amestecați bine.', 'Serviți imediat.']
        },
        3: {
            title: 'Tiramisu',
            imageUrl: 'https://placehold.co/800x400?text=Tiramisu',
            description: 'Desert elegant cu pișcoturi, cafea și mascarpone.',
            ingredients: ['500g Mascarpone', '4 ouă', '100g zahăr', '300ml cafea tare', 'Pișcoturi', 'Cacao'],
            steps: ['Separați ouăle și bateți gălbenușurile cu zahăr.', 'Adăugați mascarpone.', 'Bateți albușurile spumă și încorporați.', 'Înmuiați pișcoturile în cafea și asamblați straturile.']
        }
    };

    const recipe = recipes[id];

    if (!recipe) {
        return <div className="container"><h2>Rețeta nu a fost găsită!</h2><Link to="/">Înapoi la listă</Link></div>;
    }

    return (
        <div className="recipe-detail-container">
            <div className="detail-header">
                <Link to="/" className="back-link">← Înapoi</Link>
                <div className="actions">
                    <button className="icon-btn">❤️</button>
                    <button className="icon-btn">🖨️</button>
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
