import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`toast ${toast.type}`} style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    color: 'white',
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease',
                    backgroundColor: toast.type === 'success' ? '#2ecc71' : toast.type === 'error' ? '#e74c3c' : '#3498db'
                }}>
                    {toast.message}
                </div>
            )}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
