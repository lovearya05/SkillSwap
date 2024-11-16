import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = {
    light: {
      primary: '#007AFF',
      background: '#FFFFFF',
      text: '#000000',
      card: '#F2F2F2',
    },
    dark: {
      primary: '#0A84FF',
      background: '#000000',
      text: '#FFFFFF',
      card: '#1C1C1E',
    },
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? colors.dark : colors.light,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};