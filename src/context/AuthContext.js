import React, { createContext, useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { handleLogout, saveDataToLocalStorage } from '../utilityFunctions/utilityFunctions';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser1] = useState(null);
  const [userData, setUserData1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add your authentication functions
  const login = async (email, password) => {
    // try {
    //   setIsLoading(true);
    //   // Your login logic here
    //   const userData = { id: 1, email, name: 'John Doe' }; // Example data
    //   setUser(userData);
    //   return { success: true };
    // } catch (error) {
    //   return { success: false, error: error.message };
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      handleLogout()
      setUserData1(null)
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const setUser = (userData) => {
    setUser1(userData);
  };

  const setUserData = (userData) => {
    setUserData1(userData);
  }

  const updateUserData = () => {
    firestore().collection('users').doc(user?.email).get().then((userDataTemp) => {
      const userDataTemp1 = userDataTemp.data();
      if (userDataTemp1) {
        saveDataToLocalStorage('userData', userDataTemp1)
        setUserData(userDataTemp1 ? JSON.parse(JSON.stringify(userDataTemp1)) : null)
      }
    })
  }

  const initialState = {
    user,
    userData,
    isLoading,
    login,
    logout,
    updateUserData,
    
    setUser,
    setUserData,
  };

  return (
    <AuthContext.Provider
      value={
        initialState
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};