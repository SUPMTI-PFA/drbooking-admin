import React, { useState } from 'react';
import DoctorInfoCard from '@/components/doctors/doctorsCard';
import { useBaseContext } from '@/contexts/baseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindowClose, FaPlus } from 'react-icons/fa';
import { Colors } from '@/utils/helpers/enums';
import SpecialityCard from './specialityCard';

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

const Specialities: React.FC = () => {
  const { specialties } = useBaseContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 flex-wrap justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Our specialities</h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-700 transition"
        >
          <FaPlus size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowModal(false)}
            />

            {/* Modal content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4 "
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <motion.div className="bg-gray-300 rounded-lg shadow-lg md:w-[80%] w-full md:h-auto h-full p-6 relative overflow-auto space-y-4  "
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center  justify-between">
                  <h2 className="text-2xl font-bold">Add New Speciality</h2>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <FaWindowClose color={Colors.Error} size={20} />
                  </button>
                </div>
                {/* <PostDoctor setModal={setShowModal} /> */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialties
          ?.map((speciality: any) => (
            <SpecialityCard key={speciality.id} content={speciality.name} />
          ))}
      </div>
    </div>
  );
};

export default Specialities;