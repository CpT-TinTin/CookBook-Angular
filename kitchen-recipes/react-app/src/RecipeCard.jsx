import React from 'react';

const RecipeCard = ({ title, imageUrl, onAddToShoppingList }) => {
    const handleClick = () => {
        // alert(`Ai selectat rețeta: ${title}`);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '300px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                position: 'relative'
            }}
        >
            <button
                onClick={onAddToShoppingList}
                title="Adaugă la lista de cumpărături"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: 10
                }}
            >
                🛒
            </button>
            <img
                src={imageUrl}
                alt={title}
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                }}
            />
            <h3 style={{ marginTop: '12px', marginBottom: '0', color: '#333' }}>{title}</h3>
        </div>
    );
};

export default RecipeCard;
