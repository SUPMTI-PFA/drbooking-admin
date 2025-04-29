import React from 'react';

// Define the doctor profile and related types
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

/**
 * A card component to display doctor information.
 */
const DoctorInfoCard: React.FC<DoctorInfoCardProps> = ({ doctor }) => {
    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD;
  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with photo and basic info */}
      <div className="flex items-center px-6 py-4 bg-gray-50">
        <img
          className="w-16 h-16 object-cover rounded-full mr-4"
          src={imageBaseUrl + doctor?.photo}
          alt={doctor?.fullName}
        />
        <div>   
          <h2 className="text-xl font-semibold text-gray-800">{doctor?.fullName}</h2>
          <p className="text-gray-600">@{doctor?.username}</p>
        </div>
      </div>

      {/* Details section */}
      <div className="px-6 py-4 space-y-3">
        <div>
          <span className="font-medium text-gray-800">Email:</span>{' '}
          <a href={`mailto:${doctor?.email}`} className="text-blue-600 hover:underline">
            {doctor?.email}
          </a>
        </div>

        <div>
          <span className="font-medium text-gray-800">Spécialité:</span>{' '}
          <span className="text-gray-700">{doctor?.doctorProfile?.speciality?.name}</span>
        </div>

        <div>
          <span className="font-medium text-gray-800">Adresse:</span>{' '}
          <span className="text-gray-700">{doctor?.doctorProfile?.address}</span>
        </div>

        <div>
          <span className="font-medium text-gray-800">Bio:</span>
          <p className="text-gray-700 mt-1">{doctor?.doctorProfile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;
