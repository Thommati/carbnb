import HostTabs from "./HostTabs";
import SideBarNav from "./SideBarNav";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';

function HostDashboard() {
  return(
  <div>
    <div>
      <SideBarNav />
    </div>
    <div>
      <HostTabs />
    </div>
  </div>
  );
};

export default HostDashboard;
