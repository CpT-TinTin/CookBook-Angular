import React from 'react';
import { useShoppingList } from './ShoppingListContext';

function ShoppingList() {
    const { items, removeItem, clearList } = useShoppingList();

    const downloadText = () => {
        const text = "Listă de Cumpărături:\n\n" + items.map(i => `- ${i}`).join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lista-cumparaturi-react.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const printList = () => {
        window.print();
    };

    return (
        <div className="container shopping-list-page">
            <header className="page-header">
                <h1>🛒 Listă de Cumpărături</h1>
                <div className="actions" style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => { if (window.confirm('Sigur ștergi tot?')) clearList() }}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid var(--text-light)', background: 'transparent', color: 'var(--text-color)', cursor: 'pointer' }}
                    >
                        Golire Listă
                    </button>
                    <button
                        className="btn-primary"
                        onClick={downloadText}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: 'var(--secondary-color)', color: 'white', cursor: 'pointer' }}
                    >
                        ⬇️ Text
                    </button>
                    <button
                        className="btn-primary"
                        onClick={printList}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: 'var(--secondary-color)', color: 'white', cursor: 'pointer' }}
                    >
                        🖨️ Print / PDF
                    </button>
                </div>
            </header>

            {items.length === 0 ? (
                <div className="empty-state" style={{ textAlign: 'center', padding: '3rem', background: 'var(--card-bg)', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>Lista este goală. Adaugă ingrediente din rețete!</p>
                </div>
            ) : (
                <ul className="shopping-list" style={{ listStyle: 'none', padding: 0, background: 'var(--card-bg)', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                    {items.map(item => (
                        <li key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>{item}</span>
                            <button
                                onClick={() => removeItem(item)}
                                style={{ background: 'none', border: 'none', color: '#ff7675', fontSize: '1.5rem', cursor: 'pointer' }}
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <style>{`
        @media print {
          .actions, header button, .navbar {
            display: none !important;
          }
          .shopping-list-page {
            max-width: 100%;
            padding: 0;
          }
          .shopping-list {
            box-shadow: none;
          }
        }
      `}</style>
        </div>
    );
}

export default ShoppingList;
