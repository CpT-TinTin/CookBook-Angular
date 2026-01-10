import React, { useState } from 'react';

function AddRecipeModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        cookingTime: '',
        category: 'Toate'
    });

    const categories = ['Paste', 'Salate', 'Desert', 'Mic Dejun', 'Altele'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            cookingTime: Number(formData.cookingTime),
            ingredients: [], // Mock empty
            steps: [] // Mock empty
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Adaugă Rețetă Nouă</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Titlu</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descriere</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>URL Imagine</label>
                        <input
                            type="url"
                            required
                            placeholder="https://..."
                            value={formData.imageUrl}
                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Timp (min)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={formData.cookingTime}
                                onChange={e => setFormData({ ...formData, cookingTime: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Categorie</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Anulează</button>
                        <button type="submit" className="btn-primary">Salvează</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRecipeModal;
