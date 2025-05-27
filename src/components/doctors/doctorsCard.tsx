import React from 'react';
import { Link } from 'react-router';
import { FaRegEye, FaEnvelope, FaStethoscope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion';

interface DoctorProfile {
    address: string;
    bio: string;
    speciality: Speciality;
}

interface Speciality {
    id: number;
    name: string;
}

interface DoctorInfo {
    id: number;
    accountType: string;
    createdAt: string;
    doctorProfile: DoctorProfile;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    username: string;
    photo: string;
}

interface DoctorInfoCardProps {
    doctor: DoctorInfo;
}

const DoctorInfoCard: React.FC<DoctorInfoCardProps> = ({ doctor }) => {
    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD;

    return (
        <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full"
            whileHover={{ y: -5 }}
        >
            {/* Doctor image and basic info */}
            <div className="px-6 pt-6 pb-2 flex items-center space-x-4">
                <img
                    className="w-20 h-20 object-cover rounded-full border-4 border-blue-50"
                    src={imageBaseUrl + doctor.photo}
                    alt={doctor.fullName}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                    }}
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{doctor.fullName}</h2>
                    <p className="text-gray-500">@{doctor.username}</p>
                </div>
            </div>

            {/* Speciality badge */}
            <div className="px-6 pb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                    <FaStethoscope className="mr-2 text-blue-400" />
                    {doctor.doctorProfile.speciality.name}
                </div>
            </div>

            {/* Contact info */}
            <div className="px-6 py-4 bg-gray-50 flex-grow">
                <div className="space-y-3">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                            <FaEnvelope className="text-gray-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs font-medium text-gray-500">EMAIL</p>
                            <Link 
                                to={`mailto:${doctor.email}`} 
                                className="text-blue-500 hover:underline break-all text-sm"
                            >
                                {doctor.email}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                            <FaMapMarkerAlt className="text-gray-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs font-medium text-gray-500">LOCATION</p>
                            <p className="text-gray-700 text-sm">{doctor.doctorProfile.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer with view button */}
            <div className="px-6 py-4 border-t border-gray-100">
                <Link
                    to={`/doctors/${doctor.id}`}
                    state={{ doctor }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                    <FaRegEye size={16} className="text-blue-500" />
                    <span>View Profile</span>
                </Link>
            </div>
        </motion.div>
    );
};

export default DoctorInfoCard;