import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Doctors from '../doctors/doctors';
import Patients from '../patients/Patients';
import { useBaseContext } from '@/contexts/baseContext';
import Specialities from '../spcialities/specialities';

const MainPanel: React.FC = () => {

  // Detect mobile (you can adjust the 640px breakpoint as you like)
  const { isMobile } = useBaseContext()

  return (
    <div className="">
      <Panel header="Dashboard" className="shadow-lg rounded-lg">
        {isMobile ? (
          <Accordion>
            <AccordionTab header="Doctors">
              <Doctors />
            </AccordionTab>
            <AccordionTab header="Patients">
              <Patients />
            </AccordionTab>
            <AccordionTab header="Appointments">
              <p>Here you can visualize Appointments.</p>
            </AccordionTab>
            <AccordionTab header="Specialties">
              <Specialities />
            </AccordionTab>
          </Accordion>
        ) : (
          <TabView className="mt-4 overflow-auto">
            <TabPanel header="Doctors">
              <Doctors />
            </TabPanel>
            <TabPanel header="Patients">
              <Patients />
            </TabPanel>
            <TabPanel header="Appointments">
              <p>Here you can visualize Appointments.</p>
            </TabPanel>
            <TabPanel header="Specialties">
              <Specialities />
            </TabPanel>
          </TabView>
        )}
      </Panel>
    </div>
  );
};

export default MainPanel;
