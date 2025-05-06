import { usersAPI } from '@/api/usersApi';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext } from 'react';
import { useAuth } from './AuthContext';
import { specialtiesAPI } from '@/api/specialtiesApi';

// Context value type
type BaseContextType = {
    users: any;
    specialties: any
    usersLoading: boolean;
    specialtiesLoading: boolean
    usersError: boolean;
    specialtiesError: boolean,
    isMobile: boolean
};

// Create context with default values
const BaseContext = createContext<BaseContextType>({
    users: undefined,
    specialties: undefined,
    usersLoading: false,
    specialtiesLoading: false,
    usersError: false,
    specialtiesError: false,
    isMobile: false
});

export const useBaseContext = (): BaseContextType => {
    const context = useContext(BaseContext);
    if (!context) {
        throw new Error('useBaseContext must be used within BaseProvider');
    }
    return context;
};

// Internal provider to fetch and supply doctors data
export const BaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const {userToken} = useAuth();
     const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
      

    const { data: users, isLoading: usersLoading, isError: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: () => usersAPI(),
        enabled: !!userToken
    })

    const { data: specialties, isLoading: specialtiesLoading, isError: specialtiesError } = useQuery({
        queryKey: ['specialties'],
        queryFn: () => specialtiesAPI(),
        enabled: !!userToken
    })

    React.useEffect(() => {
        users && console.log(users);
    }, [users])

    React.useEffect(() => {
        specialties && console.log(specialties);
    }, [specialties])

    React.useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }, []);

    const baseContextValues = {
        users,
        specialties,
        usersLoading,
        specialtiesLoading,
        usersError,
        specialtiesError,
        isMobile
    };

    return (
        <BaseContext.Provider value={baseContextValues}>
            {children}
        </BaseContext.Provider>
    );
};



