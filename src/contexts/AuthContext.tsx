// contexts/AuthContext.tsx
import { loginAPI } from '@/api/authApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useNotification from '@/hooks/useNotification';
import { AuthContextType } from '@/utils/interfaces/Interfaces';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useCallback,
    useEffect,
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
    const [userToken, setUserToken, init] = useLocalStorage<string | null>("userToken", null);
    const [loading, setLoading] = useState(false);
    const notificationToken = useNotification();

    const login = useCallback((email: string, password: string, rememberMe: boolean) => {
        setLoading(true);
        loginAPI(email, password)
            .then((response: any) => {
                console.log(response.token);
                setUserToken(response.token, rememberMe);
                setLoading(false);
            })
            .catch(err => {
                console.error(err)
                setLoading(false);
            })
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setUserToken(null);
    }, []);

    useEffect(() => { !init ? setLoading(true) : setLoading(false) }, [init])

    const value = useMemo(
        () => ({
            userToken,
            user,
            loading,
            login,
            logout,
            init,
            notificationToken
        }),
        [user, loading, userToken, init]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}