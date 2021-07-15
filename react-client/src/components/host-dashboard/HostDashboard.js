import { useState } from "react";
import HostTabs from "./HostTabs";
import AppSide from '../navigation/AppSide'

function HostDashboard() {
  const [tableValue, setTableValue] = useState(0);

  const handleTabChange = (valueData) => {
    setTableValue(valueData);
  }

  return(
    <div>
      <AppSide tabChange={handleTabChange} />
      <HostTabs tabValue={tableValue} />
    </div>
  );
};

export default HostDashboard;
