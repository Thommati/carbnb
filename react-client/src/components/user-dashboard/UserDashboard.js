import MainContainer from "./MainContainer";
import UserTabs from "./UserTabs";
import AdminTabs from "./AdminTabs";

function UserDashboard() {
  return(
  <div>
    <div>
      <UserTabs />
    </div>
    {/* <div>
      <AdminTabs />
    </div> */}
  </div>
  );
};

export default UserDashboard;
