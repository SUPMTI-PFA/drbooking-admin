import React from 'react';
import { Link } from 'react-router';
import { FaRegEye, FaEnvelope } from "react-icons/fa";
import { TbPhotoOff } from "react-icons/tb";
import { motion } from 'framer-motion';

interface PatientProfile {
    address: string;
    bio: string;
}

interface PatientInfo {
    id: number;
    accountType: string;
    createdAt: string;
    PatientProfile: PatientProfile;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    username: string;
    photo: string;
}

interface PatientInfoCardProps {
    Patient: PatientInfo;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ Patient }) => {
    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD;

    return (
        <motion.div 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
            whileHover={{ y: -3 }}
        >
            {/* Header with patient photo and basic info */}
            <div className="px-5 pt-5 pb-3 flex items-center space-x-4">
                <div className="relative">
                    {Patient?.photo ? (
                        <img
                            className="w-16 h-16 object-cover rounded-full border-4 border-blue-50"
                            src={imageBaseUrl + Patient.photo}
                            alt={Patient.fullName}
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full border-4 border-blue-50 bg-gray-100 flex items-center justify-center">
                            <TbPhotoOff size={24} className="text-gray-400" />
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{Patient.fullName}</h2>
                    <p className="text-gray-500 text-sm">@{Patient.username}</p>
                </div>
            </div>

            {/* Contact information */}
            <div className="px-5 py-3 bg-blue-50 flex-grow">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                        <FaEnvelope className="text-blue-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-xs font-medium text-gray-500">EMAIL</p>
                        <Link 
                            to={`mailto:${Patient.email}`} 
                            className="text-blue-600 hover:underline text-sm break-all"
                        >
                            {Patient.email}
                        </Link>
                    </div>
                </div>
            </div>

            {/* View button */}
            <div className="px-5 py-3 border-t border-gray-100">
                <Link
                    to={`/patients/${Patient.id}`}
                    state={{ Patient }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                    <FaRegEye size={16} className="text-blue-500" />
                    <span>View Profile</span>
                </Link>
            </div>
        </motion.div>
    );
};

export default PatientInfoCard;