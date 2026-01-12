import React, { createContext, useState, useContext, useEffect } from 'react';

const ShoppingListContext = createContext();

export function ShoppingListProvider({ children }) {
    const [items, setItems] = useState([]);
    const apiUrl = 'http://localhost:3000/shoppingList';

    const loadItems = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setItems(data.map(i => i.name));
        } catch (error) {
            console.error('Failed to load items', error);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const addItems = async (newItems) => {
        try {
            const response = await fetch(apiUrl);
            const currentItems = await response.json();
            const currentNames = new Set(currentItems.map(i => i.name));
            const itemsToAdd = newItems.filter(item => !currentNames.has(item));

            if (itemsToAdd.length === 0) return;

            await Promise.all(itemsToAdd.map(item =>
                fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: item })
                })
            ));
            loadItems();
        } catch (error) {
            console.error('Failed to add items', error);
        }
    };

    const removeItem = async (item) => {
        try {
            const response = await fetch(`${apiUrl}?name=${encodeURIComponent(item)}`);
            const matches = await response.json();
            if (matches.length > 0) {
                await fetch(`${apiUrl}/${matches[0].id}`, { method: 'DELETE' });
                loadItems();
            }
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };

    const clearList = async () => {
        try {
            const response = await fetch(apiUrl);
            const items = await response.json();
            await Promise.all(items.map(item =>
                fetch(`${apiUrl}/${item.id}`, { method: 'DELETE' })
            ));
            loadItems();
        } catch (error) {
            console.error('Failed to clear list', error);
        }
    };

    return (
        <ShoppingListContext.Provider value={{ items, addItems, removeItem, clearList }}>
            {children}
        </ShoppingListContext.Provider>
    );
}

export function useShoppingList() {
    return useContext(ShoppingListContext);
}
