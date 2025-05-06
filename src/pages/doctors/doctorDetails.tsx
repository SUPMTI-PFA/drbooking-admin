import { usersAPI } from '@/api/usersApi';
import DoctorInfoCard from '@/components/doctors/doctorsCard';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useFormik } from 'formik';
import { formDataNormalizer } from '@/utils/helpers/Helpers';

const DoctorDetailPage: React.FC = () => {
    const location = useLocation();
    const initialDoctor = location.state?.doctor;
    const { id } = useParams<{ id: string }>();
    const { userToken } = useAuth();
    const queryClient = useQueryClient();

    // Local UI state
    const [doctor, setDoctor] = useState<any>(initialDoctor ?? null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(!initialDoctor && Boolean(id));

    const { data: fetchedDoctor, isLoading: fetchedDoctorLoading, isError: fetchedDoctorError } = useQuery({
        queryKey: ['user'],
        queryFn: () => usersAPI(id),
        enabled: !!userToken && !doctor
    })

    // Formik setup
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: doctor?.fullName || '',
            email: doctor?.email || '',
            speciality: doctor?.doctorProfile?.speciality?.name || '',
            address: doctor?.doctorProfile?.address || '',
            bio: doctor?.doctorProfile?.bio || '',
        },
        onSubmit: (values) => {
            setError(null);
            console.log({values});
            const FD = formDataNormalizer(values);
            console.log(console.log(Array.from(FD.entries())));
            
        },
    });

    useEffect(() => {
        if (!doctor) setLoading(true);
        console.log({ fetchedDoctor });

        if (fetchedDoctor) {
            setDoctor(fetchedDoctor[0]);
            setLoading(false);
        }
    }, [fetchedDoctor, fetchedDoctorLoading, fetchedDoctorError]);

    if (loading || fetchedDoctorLoading) {
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

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {editing ? 'Edit Doctor' : 'Doctor Details'}
                </h1>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit
                    </button>
                )}
            </div>

            {editing ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Full Name</label>
                        <input
                            {...formik.getFieldProps('fullName')}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            {...formik.getFieldProps('email')}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Specialty</label>
                        <input
                            {...formik.getFieldProps('speciality')}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Address</label>
                        <input
                            {...formik.getFieldProps('address')}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Bio</label>
                        <textarea
                            {...formik.getFieldProps('bio')}
                            className="mt-1 block w-full border rounded px-3 py-2"
                            rows={4}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-white shadow rounded-lg p-6">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <img
                            className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
                            src={import.meta.env.VITE_API_UPLOAD + doctor.photo}
                            alt={doctor.fullName}
                        />
                        <div className="ml-6">
                            <h2 className="text-2xl font-bold text-gray-800">{doctor.fullName}</h2>
                            <p className="text-gray-500">@{doctor.username}</p>
                        </div>
                    </div>

                    {/* Details */}
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
                            <dt className="font-medium">Specialty</dt>
                            <dd>{doctor.doctorProfile.speciality.name}</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Address</dt>
                            <dd>{doctor.doctorProfile.address}</dd>
                        </div>
                        <div className="md:col-span-2">
                            <dt className="font-medium">Bio</dt>
                            <dd>{doctor.doctorProfile.bio}</dd>
                        </div>
                    </dl>

                    {/* Metadata */}
                    <div className="mt-6 border-t pt-4 text-gray-500 text-sm">
                        <p>Account type: {doctor.accountType}</p>
                        <p>Registered on: {new Date(doctor.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDetailPage;
