import React from 'react';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';

const MainPanel: React.FC = () => {
  return (
    <div className="">
      <Panel header="Dashboard" className="shadow-lg rounded-lg ">
        <TabView className="mt-4">
          <TabPanel header="Patients">
            <p>Here you can visualize Patients.</p>
          </TabPanel>

          <TabPanel header="Appointments">
            <p>Here you can visualize Appointments.</p>
          </TabPanel>

          <TabPanel header="Reports">
            <p>Generate and view reports here.</p>
          </TabPanel>

          <TabPanel header="Settings">
            <p>Update dashboard settings.</p>
          </TabPanel>
        </TabView>
      </Panel>
    </div>
  );
};

export default MainPanel;
