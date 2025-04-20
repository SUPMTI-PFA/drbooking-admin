// contexts/AuthContext.tsx
import { loginAPI } from '@/api/authApi';
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
    const [userToken, setUserToken] = useLocalStorage<string | null>("userToken", null);
    const [loading, setLoading] = useState(false);

    const login = (email: string, password: string) => {
        setLoading(true);
        loginAPI(email, password).then((response:any) => {
            setLoading(false);
            console.log(response);
            setUserToken(response.token);
        })
        .catch(err => console.error(err))
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