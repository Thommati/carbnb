import { useState } from "react";
import UserTabs from "./UserTabs";
import AppSide from '../navigation/AppSide'


function UserDashboard() {
  const [tableValue, setTableValue] = useState(0);

  const handleTabChange = (valueData) => {
    console.log('Handle Change', valueData);
    setTableValue(valueData);
  }

  return(
  <div>
    <AppSide tabChange={handleTabChange} />
    <UserTabs tabValue={tableValue}/>
  </div>
  );
};

export default UserDashboard;
