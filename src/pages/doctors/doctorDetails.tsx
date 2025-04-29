import { doctorsAPI } from '@/api/doctorsApi';
import DoctorInfoCard from '@/components/doctors/doctorsCard';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { set } from 'react-datepicker/dist/date_utils';
import { useLocation, useParams, Navigate } from 'react-router';


/**
 * A page component for displaying detailed information about a doctor.
 * It first tries to use the `doctor` object from location state.
 * If none is provided, it fetches the doctor by ID from the API.
 */
const DoctorDetailPage: React.FC = () => {
    // Try to get the doctor from route state
    const location = useLocation();
    const initialDoctor = location.state?.doctor;

    // Get the doctor ID from URL params
    const { id } = useParams<{ id: string }>();

    // Local state for doctor, loading, and error
    const [doctor, setDoctor] = useState<any>(initialDoctor ?? null);
    const [loading, setLoading] = useState<boolean>(!initialDoctor && Boolean(id));
    const [error, setError] = useState<string | null>(null);
    const { userToken } = useAuth();

    const { data: fetchedDoctor, isLoading: fetchedDoctorLoading, isError: fetchedDoctorError } = useQuery({
        queryKey: ['user'],
        queryFn: () => doctorsAPI(id),
        enabled: !!userToken && !doctor
    })

    useEffect(() => {
        if(!doctor) setLoading(true);
        if (fetchedDoctor) {
            setDoctor(fetchedDoctor);
            setLoading(false);
        }
    }, [fetchedDoctor, fetchedDoctorLoading, fetchedDoctorError]);

    if (loading) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-600">Loading doctor data&hellip;</p>
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
                    src={imageBaseUrl + doctor.photo}
                    alt={doctor.fullName}
                />
                <div className="ml-6">
                    <h1 className="text-3xl font-bold text-gray-800">{doctor.fullName}</h1>
                    <p className="text-gray-500">@{doctor.username}</p>
                </div>
            </div>

            {/* Details Card */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Détails du docteur</h2>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-700">
                    <div>
                        <dt className="font-medium">Email</dt>
                        <dd>
                            <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline">
                                {doctor.email}
                            </a>
                        </dd>
                    </div>

                    <div>
                        <dt className="font-medium">Spécialité</dt>
                        <dd>{doctor.doctorProfile.speciality.name}</dd>
                    </div>

                    <div>
                        <dt className="font-medium">Adresse</dt>
                        <dd>{doctor.doctorProfile.address}</dd>
                    </div>

                    <div className="md:col-span-2">
                        <dt className="font-medium">Bio</dt>
                        <dd>{doctor.doctorProfile.bio}</dd>
                    </div>
                </dl>

                {/* Optional metadata */}
                <div className="mt-6 border-t pt-4 text-gray-500 text-sm">
                    <p>Type de compte : {doctor.accountType}</p>
                    <p>Inscrit le : {new Date(doctor.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetailPage;
