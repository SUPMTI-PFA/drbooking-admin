import React from 'react';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import Doctors from '../doctors/doctors';

const MainPanel: React.FC = () => {
  return (
    <div className="">
      <Panel header="Dashboard" className="shadow-lg rounded-lg ">
        <TabView className="mt-4">
          <TabPanel header="Doctors">
            <Doctors/>
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
      </Panel>
    </div>
  );
};

export default MainPanel;
