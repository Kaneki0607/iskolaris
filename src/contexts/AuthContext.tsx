import React, { createContext, useContext, useState } from 'react';
import { AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
    signIn: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });

    const signIn = () => {
        // Mock implementation
        console.log('Sign in');
    };

    const signOut = () => {
        // Mock implementation
        console.log('Sign out');
    };

    return (
        <AuthContext.Provider value={{ ...authState, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
