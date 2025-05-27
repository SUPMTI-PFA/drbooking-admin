import { FaUserMd, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap, FaBriefcase, FaVenusMars, FaPhone, FaNewspaper } from 'react-icons/fa';
import { MdEdit, MdCancel, MdSave } from 'react-icons/md';
import { usersAPI } from '@/api/usersApi';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useFormik } from 'formik';
import { formDataNormalizer } from '@/utils/helpers/Helpers';
import AnimatedPage from '@/components/AnimatedPage';
import { motion } from 'framer-motion';

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
    });

    // Formik setup
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: doctor?.fullName || '',
            firstName: doctor?.firstName || '',
            lastName: doctor?.lastName || '',
            email: doctor?.email || '',
            telephone: doctor?.telephone || '',
            gender: doctor?.gender || '',
            newsletter: doctor?.newsletter || false,
            speciality: doctor?.doctorProfile?.speciality?.name || '',
            address: doctor?.doctorProfile?.address || '',
            bio: doctor?.doctorProfile?.bio || '',
            experience: doctor?.doctorProfile?.experience || '',
            specializations: doctor?.doctorProfile?.specializations?.join(', ') || '',
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

    if (!doctor) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-600">Doctor not found</p>
            </div>
        );
    }

    return (
        <AnimatedPage>
            <div className="container mx-auto p-4 md:p-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {editing ? 'Edit Doctor Profile' : 'Doctor Profile'}
                    </h1>
                    {!editing && (
                        <motion.button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MdEdit size={18} /> Edit Profile
                        </motion.button>
                    )}
                </div>

                {editing ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            {...formik.getFieldProps('fullName')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input
                                                {...formik.getFieldProps('firstName')}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input
                                                {...formik.getFieldProps('lastName')}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            {...formik.getFieldProps('email')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            {...formik.getFieldProps('telephone')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select
                                            {...formik.getFieldProps('gender')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        >
                                            <option value="H">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            {...formik.getFieldProps('newsletter')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                                            Subscribed to Newsletter
                                        </label>
                                    </div>
                                </div>

                                {/* Professional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Professional Information</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                                        <input
                                            {...formik.getFieldProps('speciality')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                        <input
                                            type="number"
                                            {...formik.getFieldProps('experience')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            {...formik.getFieldProps('address')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Specializations (comma separated)</label>
                                        <input
                                            {...formik.getFieldProps('specializations')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    {...formik.getFieldProps('bio')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                    rows={4}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <motion.button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <MdCancel size={18} /> Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <MdSave size={18} /> Save Changes
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="relative">
                                    <img
                                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-sm"
                                        src={import.meta.env.VITE_API_UPLOAD + doctor.photo}
                                        alt={doctor.fullName}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{doctor.fullName}</h2>
                                    <p className="text-gray-500 mt-1">@{doctor.username}</p>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            <FaUserMd size={14} />
                                            <span>{doctor.doctorProfile.speciality.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            <FaBriefcase size={14} />
                                            <span>{doctor.doctorProfile.experience} years experience</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                                <FaEnvelope size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email</p>
                                                <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline">
                                                    {doctor.email}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                                <FaPhone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="text-gray-700">{doctor.telephone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                                <FaVenusMars size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Gender</p>
                                                <p className="text-gray-700">
                                                    {doctor.gender === 'H' ? 'Male' : doctor.gender === 'F' ? 'Female' : 'Other'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                                <FaNewspaper size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Newsletter</p>
                                                <p className="text-gray-700">
                                                    {doctor.newsletter ? 'Subscribed' : 'Not subscribed'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Location</h3>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                            <FaMapMarkerAlt size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Address</p>
                                            <p className="text-gray-700">{doctor.doctorProfile.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Specializations */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Specializations</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.doctorProfile.specializations.map((spec: string, index: number) => (
                                            <span 
                                                key={index} 
                                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Education</h3>
                                    <div className="space-y-4">
                                        {doctor.doctorProfile.doctorEducation.map((edu: any, index: number) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                                    <FaGraduationCap size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-700">{edu.degree}</p>
                                                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                                                    <p className="text-gray-500 text-xs">{edu.year}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">About</h3>
                            <p className="text-gray-700">{doctor.doctorProfile.bio}</p>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 md:px-8 py-4 border-t border-gray-200">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt size={14} />
                                    <span>Registered on: {new Date(doctor.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUserMd size={14} />
                                    <span>Account type: {doctor.accountType}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </AnimatedPage>
    );
};

export default DoctorDetailPage;