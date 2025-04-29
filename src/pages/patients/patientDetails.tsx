import { usersAPI } from '@/api/usersApi';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { set } from 'react-datepicker/dist/date_utils';
import { useLocation, useParams, Navigate } from 'react-router';


/**
 * A page component for displaying detailed information about a Patient.
 * It first tries to use the `Patient` object from location state.
 * If none is provided, it fetches the Patient by ID from the API.
 */
const PatientDetailPage: React.FC = () => {
    // Try to get the Patient from route state
    const location = useLocation();
    const initialPatient = location.state?.Patient;

    // Get the Patient ID from URL params
    const { id } = useParams<{ id: string }>();

    // Local state for Patient, loading, and error
    const [Patient, setPatient] = useState<any>(initialPatient ?? null);
    const [loading, setLoading] = useState<boolean>(!initialPatient && Boolean(id));
    const [error, setError] = useState<string | null>(null);
    const { userToken } = useAuth();

    const { data: fetchedPatient, isLoading: fetchedPatientLoading, isError: fetchedPatientError } = useQuery({
        queryKey: ['user'],
        queryFn: () => usersAPI(id),
        enabled: !!userToken && !Patient
    })

    useEffect(() => {
        if(!Patient) setLoading(true);
        if (fetchedPatient) {
            setPatient(fetchedPatient);
            setLoading(false);
        }
    }, [fetchedPatient, fetchedPatientLoading, fetchedPatientError]);

    if (loading) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-600">Loading Patient data&hellip;</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex items-center mb-8">
                <img
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
                    src={imageBaseUrl + Patient.photo}
                    alt={Patient.fullName}
                />
                <div className="ml-6">
                    <h1 className="text-3xl font-bold text-gray-800">{Patient.fullName}</h1>
                    <p className="text-gray-500">@{Patient.username}</p>
                </div>
            </div>

            {/* Details Card */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient details</h2>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-700">
                    <div>
                        <dt className="font-medium">Email</dt>
                        <dd>
                            <a href={`mailto:${Patient.email}`} className="text-blue-600 hover:underline">
                                {Patient.email}
                            </a>
                        </dd>
                    </div>

                    {/* <div>
                        <dt className="font-medium">Spécialité</dt>
                        <dd>{Patient.PatientProfile.speciality.name}</dd>
                    </div>

                    <div>
                        <dt className="font-medium">Adresse</dt>
                        <dd>{Patient.PatientProfile.address}</dd>
                    </div> */}

                    {/* <div className="md:col-span-2">
                        <dt className="font-medium">Bio</dt>
                        <dd>{Patient.PatientProfile.bio}</dd>
                    </div> */}
                </dl>

                {/* Optional metadata */}
                <div className="mt-6 border-t pt-4 text-gray-500 text-sm">
                    <p>Account type : {Patient.accountType}</p>
                    <p>Registered on : {new Date(Patient.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default PatientDetailPage;
