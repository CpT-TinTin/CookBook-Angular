import React, { createContext, useState, useContext, useEffect } from 'react';

const ShoppingListContext = createContext();

export function ShoppingListProvider({ children }) {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('reactShoppingList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('reactShoppingList', JSON.stringify(items));
    }, [items]);

    const addItems = (newItems) => {
        setItems(prevItems => {
            const uniqueItems = new Set([...prevItems, ...newItems]);
            return Array.from(uniqueItems);
        });
    };

    const removeItem = (item) => {
        setItems(prevItems => prevItems.filter(i => i !== item));
    };

    const clearList = () => {
        setItems([]);
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
