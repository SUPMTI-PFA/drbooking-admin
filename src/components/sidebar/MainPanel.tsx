import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Doctors from '../doctors/doctors';

const MainPanel: React.FC = () => {
  // Detect mobile (you can adjust the 640px breakpoint as you like)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="">
      <Panel header="Dashboard" className="shadow-lg rounded-lg">
        {isMobile ? (
          <Accordion>
            <AccordionTab header="Doctors">
              <Doctors />
            </AccordionTab>
            <AccordionTab header="Patients">
              <p>Here you can visualize Patients.</p>
            </AccordionTab>
            <AccordionTab header="Appointments">
              <p>Here you can visualize Appointments.</p>
            </AccordionTab>
            <AccordionTab header="Specialties">
              <p>Update dashboard settings.</p>
            </AccordionTab>
          </Accordion>
        ) : (
          <TabView className="mt-4 overflow-auto">
            <TabPanel header="Doctors">
              <Doctors />
            </TabPanel>
            <TabPanel header="Patients">
              <p>Here you can visualize Patients.</p>
            </TabPanel>
            <TabPanel header="Appointments">
              <p>Here you can visualize Appointments.</p>
            </TabPanel>
            <TabPanel header="Specialties">
              <p>Update dashboard settings.</p>
            </TabPanel>
          </TabView>
        )}
      </Panel>
    </div>
  );
};

export default MainPanel;
