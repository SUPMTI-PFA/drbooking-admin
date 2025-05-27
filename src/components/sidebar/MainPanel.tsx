import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel, TabViewTabChangeEvent } from 'primereact/tabview';
import { Accordion, AccordionTab, AccordionTabChangeEvent } from 'primereact/accordion';
import { AnimatePresence, motion } from 'framer-motion';
import Doctors from '../doctors/doctors';
import Patients from '../patients/Patients';
import Specialities from '../spcialities/specialities';
import { useBaseContext } from '@/contexts/baseContext';

const animationVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const MainPanel: React.FC = () => {
  const { isMobile } = useBaseContext();

  // Initialize from localStorage or default to 0
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const saved = localStorage.getItem('mainPanelActiveIndex');
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(() => {
    const saved = localStorage.getItem('mainPanelActiveMobileIndex');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Handlers that update state and persist
  const handleDesktopTabChange = (e: TabViewTabChangeEvent) => {
    const index = e.index;
    setActiveIndex(index);
    localStorage.setItem('mainPanelActiveIndex', index.toString());
  };

  const handleMobileTabChange = (e: AccordionTabChangeEvent) => {
    const index = e.index as number;
    setActiveMobileIndex(index);
    localStorage.setItem('mainPanelActiveMobileIndex', index.toString());
  };

  return (
    <div>
      <Panel header="Dashboard" className="shadow-lg rounded-lg">
        {isMobile ? (
          <Accordion
            activeIndex={activeMobileIndex}
            onTabChange={handleMobileTabChange}
          >
            <AccordionTab header="Doctors">
              <AnimatePresence mode="wait">
                {activeMobileIndex === 0 && (
                  <motion.div
                    key="doctors-mobile"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Doctors />
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionTab>
            <AccordionTab header="Patients">
              <AnimatePresence mode="wait">
                {activeMobileIndex === 1 && (
                  <motion.div
                    key="patients-mobile"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Patients />
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionTab>
            <AccordionTab header="Appointments">
              <AnimatePresence mode="wait">
                {activeMobileIndex === 2 && (
                  <motion.div
                    key="appointments-mobile"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <p>Here you can visualize Appointments.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionTab>
            <AccordionTab header="Specialties">
              <AnimatePresence mode="wait">
                {activeMobileIndex === 3 && (
                  <motion.div
                    key="specialties-mobile"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Specialities />
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionTab>
          </Accordion>
        ) : (
          <TabView
            activeIndex={activeIndex}
            onTabChange={handleDesktopTabChange}
            className="mt-4 overflow-auto"
          >
            <TabPanel header="Doctors">
              <AnimatePresence mode="wait">
                {activeIndex === 0 && (
                  <motion.div
                    key="doctors-desktop"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Doctors />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabPanel>
            <TabPanel header="Patients">
              <AnimatePresence mode="wait">
                {activeIndex === 1 && (
                  <motion.div
                    key="patients-desktop"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Patients />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabPanel>
            <TabPanel header="Appointments">
              <AnimatePresence mode="wait">
                {activeIndex === 2 && (
                  <motion.div
                    key="appointments-desktop"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <p>Here you can visualize Appointments.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabPanel>
            <TabPanel header="Specialties">
              <AnimatePresence mode="wait">
                {activeIndex === 3 && (
                  <motion.div
                    key="specialties-desktop"
                    variants={animationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Specialities />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabPanel>
          </TabView>
        )}
      </Panel>
    </div>
  );
};

export default MainPanel;
