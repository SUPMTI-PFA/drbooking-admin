import { doctorsAPI } from '@/api/doctorsApi';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext } from 'react';
import { useAuth } from './AuthContext';
import { specialtiesAPI } from '@/api/specialtiesApi';

// Context value type
type BaseContextType = {
    doctors: any;
    specialties: any
    doctorsLoading: boolean;
    specialtiesLoading: boolean
    doctorsError: boolean;
    specialtiesError: boolean
};

// Create context with default values
const BaseContext = createContext<BaseContextType>({
    doctors: undefined,
    specialties: undefined,
    doctorsLoading: false,
    specialtiesLoading: false,
    doctorsError: false,
    specialtiesError: false
});

export const useBaseContext = (): BaseContextType => {
    const context = useContext(BaseContext);
    if (!context) {
        throw new Error('useDoctors must be used within BaseProvider');
    }
    return context;
};

// Internal provider to fetch and supply doctors data
export const BaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const {userToken} = useAuth();

    const { data: doctors, isLoading: doctorsLoading, isError: doctorsError } = useQuery({
        queryKey: ['users'],
        queryFn: () => doctorsAPI(),
        enabled: !!userToken
    })

    const { data: specialties, isLoading: specialtiesLoading, isError: specialtiesError } = useQuery({
        queryKey: ['specialties'],
        queryFn: () => specialtiesAPI(),
        enabled: !!userToken
    })

    React.useEffect(() => {
        console.log(doctors);
    }, [doctors])

    const baseContextValues = {
        doctors,
        specialties,
        doctorsLoading,
        specialtiesLoading,
        doctorsError,
        specialtiesError
    };

    return (
        <BaseContext.Provider value={baseContextValues}>
            {children}
        </BaseContext.Provider>
    );
};



