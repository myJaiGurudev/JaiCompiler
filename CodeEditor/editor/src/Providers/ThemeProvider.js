import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const initialData = "vs-dark";

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const localData = localStorage.getItem('theme');
        return localData ? localData : initialData;
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
