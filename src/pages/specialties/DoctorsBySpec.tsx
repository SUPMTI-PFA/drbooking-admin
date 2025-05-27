import React, { useState } from 'react';
import DoctorInfoCard from '@/components/doctors/doctorsCard';
import { useBaseContext } from '@/contexts/baseContext';
import { useParams } from 'react-router';
import Specialities from '@/components/spcialities/specialities';

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 }
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 }
};



const DoctorsBySpec: React.FC = () => {
    const { users } = useBaseContext();
    const { specialty } = useParams();
    const filteredDocs = users?.filter((user: any) => user.accountType?.toLowerCase() === 'doctor' && user?.doctorProfile?.speciality?.name?.toLowerCase() === specialty?.toLowerCase())

    return (
        <div className="sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 flex-wrap justify-center">
                <h1 className="text-3xl font-bold text-gray-800">{specialty} doctors</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs?.length > 0 
                ? filteredDocs?.map((doctor: any) => (
                    <DoctorInfoCard key={doctor.id} doctor={doctor} />
                ))
            : <p>No doctors found for this specialty.</p>}
            </div>
        </div>
    );
};

export default DoctorsBySpec;