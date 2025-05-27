import { useBaseContext } from '@/contexts/baseContext';
import React from 'react';
import PatientInfoCard from './PatientCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaWindowClose, FaSearch } from 'react-icons/fa';
import PostPatient from './postPatient';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 25 
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { 
      ease: 'easeInOut' 
    } 
  }
};

const Patients: React.FC = () => {
  const { users } = useBaseContext();
  const [showModal, setShowModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPatients = users?.filter((user: any) => {
    if (user?.accountType?.toLowerCase() !== "patient") return false;
    
    if (!searchTerm) return true;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const nameMatch = user.fullName?.toLowerCase().includes(lowerSearchTerm);
    const emailMatch = user.email?.toLowerCase().includes(lowerSearchTerm);
    
    return nameMatch || emailMatch;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Our Patients</h1>
          <p className="text-gray-600 mt-2">
            Manage patient records and information
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Add Patient Button */}
          <motion.button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus size={18} />
            <span>Add Patient</span>
          </motion.button>
        </div>
      </div>

      {/* Modal for Adding New Patient */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 relative"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Add New Patient
                    </h2>
                    <motion.button
                      type="button"
                      onClick={() => setShowModal(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaWindowClose size={24} />
                    </motion.button>
                  </div>
                  <PostPatient setModal={setShowModal} />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Patients Grid */}
      {filteredPatients?.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredPatients.map((patient: any) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <PatientInfoCard Patient={patient} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="text-gray-500 text-lg">
            {searchTerm ? 
              "No patients match your search criteria" : 
              "No patients available"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;