import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    // Load initial state from LocalStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('giftshop_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }

        const savedUser = localStorage.getItem('giftshop_user');
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, []);

    // Helper to trigger custom toast notification
    const showToast = (message) => {
        setToastMessage(message);
    };

    // Auto-clear toast after 3 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // Cart Handlers
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }
            localStorage.setItem('giftshop_cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
        showToast(`Added ${product.name} to cart! 🛒`);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== productId);
            localStorage.setItem('giftshop_cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('giftshop_cart');
    };

    // User Session Handlers
    const login = (email) => {
        const username = email.split('@')[0];
        setCurrentUser(username);
        localStorage.setItem('giftshop_user', username);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('giftshop_user');
    };

    return (
        <AppContext.Provider
            value={{
                cart,
                currentUser,
                searchQuery,
                setSearchQuery,
                toastMessage,
                showToast,
                addToCart,
                removeFromCart,
                clearCart,
                login,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
