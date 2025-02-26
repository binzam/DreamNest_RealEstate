import { BiSolidBuildingHouse } from 'react-icons/bi';
import { HiMiniUsers } from 'react-icons/hi2';
import { MdPayments } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { DashboardData } from '../../../types/interface';
import './AdminDashboardStats.css'
interface AdminDashboardStatsProps {
  dashboardData: DashboardData;
}
const AdminDashboardStats = ({ dashboardData }: AdminDashboardStatsProps) => {
  const { totalProperties, totalRevenue, totalUsers, totalTransactions } =
    dashboardData;
  return (
    <div className="dash_stats">
      <div className="stat_item pty">
        <div className="stat_hdr">
          <span>
            <BiSolidBuildingHouse />
          </span>
          <h2>Properties</h2>
        </div>
        <p>{totalProperties}</p>
      </div>

      <div className="stat_item revn">
        <div className="stat_hdr">
          <span>
            <TbReportMoney />
          </span>
          <h2>Revenue</h2>
        </div>
        <p>${totalRevenue}</p>
      </div>
      <div className="stat_item txn">
        <div className="stat_hdr">
          <span>
            <MdPayments />
          </span>
          <h2>Transactions</h2>
        </div>
        <p>{totalTransactions}</p>
      </div>
      <div className="stat_item usr">
        <div className="stat_hdr">
          <span>
            <HiMiniUsers />
          </span>
          <h2>Users</h2>
        </div>
        <p>{totalUsers}</p>
      </div>
    </div>
  );
};

export default AdminDashboardStats;
