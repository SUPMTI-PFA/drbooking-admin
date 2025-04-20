// contexts/AuthContext.tsx
import { useLocalStorage } from '@/hooks/LocalStorage';
import { AuthContextType } from '@/utils/interfaces/Interfaces';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';

// Create the context with default values
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// AuthProvider component props
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<any>(null);
    const [userToken, setUserToken] = useLocalStorage<string | null>("@userToken", null)
    const [loading, setLoading] = useState(true);

    const login = async (email: string, password: string) => {
        try {
            // Replace with actual login API call
            const fakeUser = { id: '1', username: email };
            setUser(fakeUser);
            localStorage.setItem('user', JSON.stringify(fakeUser));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({
            userToken,
            user,
            loading,
            login,
            logout,
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}