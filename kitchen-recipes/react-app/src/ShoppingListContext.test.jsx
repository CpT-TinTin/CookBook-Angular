import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ShoppingListProvider, useShoppingList } from './ShoppingListContext';
import { describe, it, expect, beforeEach } from 'vitest';

// Test component to consume the context
const TestComponent = () => {
    const { items, addItems, removeItem, clearList } = useShoppingList();
    return (
        <div>
            <div data-testid="items">{JSON.stringify(items)}</div>
            <button onClick={() => addItems(['Mere', 'Pere'])}>Add Fruits</button>
            <button onClick={() => addItems(['Mere'])}>Add Duplicate</button>
            <button onClick={() => removeItem('Mere')}>Remove Mere</button>
            <button onClick={() => clearList()}>Clear</button>
        </div>
    );
};

describe('ShoppingListContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('provides empty list initially', () => {
        render(
            <ShoppingListProvider>
                <TestComponent />
            </ShoppingListProvider>
        );
        expect(screen.getByTestId('items')).toHaveTextContent('[]');
    });

    it('adds items correctly', async () => {
        render(
            <ShoppingListProvider>
                <TestComponent />
            </ShoppingListProvider>
        );

        await act(async () => {
            screen.getByText('Add Fruits').click();
        });

        expect(screen.getByTestId('items')).toHaveTextContent('["Mere","Pere"]');
    });

    it('prevents duplicates', async () => {
        render(
            <ShoppingListProvider>
                <TestComponent />
            </ShoppingListProvider>
        );

        await act(async () => {
            screen.getByText('Add Fruits').click();
        });

        await act(async () => {
            screen.getByText('Add Duplicate').click();
        });

        expect(screen.getByTestId('items')).toHaveTextContent('["Mere","Pere"]');
    });

    it('removes items correctly', async () => {
        render(
            <ShoppingListProvider>
                <TestComponent />
            </ShoppingListProvider>
        );

        await act(async () => {
            screen.getByText('Add Fruits').click();
        });

        await act(async () => {
            screen.getByText('Remove Mere').click();
        });

        expect(screen.getByTestId('items')).toHaveTextContent('["Pere"]');
    });

    it('clears list correctly', async () => {
        render(
            <ShoppingListProvider>
                <TestComponent />
            </ShoppingListProvider>
        );

        await act(async () => {
            screen.getByText('Add Fruits').click();
        });

        await act(async () => {
            screen.getByText('Clear').click();
        });

        expect(screen.getByTestId('items')).toHaveTextContent('[]');
    });
});
