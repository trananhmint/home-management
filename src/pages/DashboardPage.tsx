
import { Building2, DoorOpen, DollarSign, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockHouses, mockInvoices, mockRooms } from '../data/mockData';
import { formatCurrency } from '../utils/format';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { supabase } from '../supabase-client';
import { useEffect, useState } from 'react';
import { userService } from '../services/UserService';
import SignupModal from '../components/SignUpModal';
import { dashboardService } from '../services/DashboardService';
import type { Dashboard, SummaryHouse } from '../types';


export function DashboardPage() {
  const totalRevenue = mockHouses.reduce((sum, house) => sum + house.monthlyRevenue, 0);
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter((r) => r.status === 'occupied').length;
  const overdueInvoices = mockInvoices.filter((inv) => inv.status === 'overdue').length;

  const [summaryHouse, setSummaryHouse] = useState<SummaryHouse[]>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const fetchDashboard = async () => {
    const { data, error } = await dashboardService.getLessorDashboard();
    console.log(">>> Dashboard", data, error);
    setSummaryHouse(data.houses);
    setDashboard(data);
  }

  const handleAddLessor = async () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

  const stats = [
    {
      title: 'Tổng doanh thu',
      value: `${formatCurrency(dashboard?.summary.totalMonthlyRevenue || 0)} / ${formatCurrency(dashboard?.summary.totalExpectedMonthlyRevenue || 0)}`,
      icon: DollarSign,
      description: 'Doanh thu tháng này',
      className: 'bg-green-600/10 text-green-600',
    },
    {
      title: 'Tổng nhà trọ',
      value: dashboard?.summary.totalHouses || 0,
      icon: Building2,
      description: `${dashboard?.summary.totalHouses} phòng`,
      className: 'bg-blue-600/10 text-blue-600',
    },
    {
      title: 'Phòng đang thuê',
      value: `${dashboard?.summary.occupiedRooms} / ${dashboard?.summary.totalRooms}`,
      icon: DoorOpen,
      description: `${((dashboard?.summary.occupiedRooms/dashboard?.summary.totalRooms) * 100).toFixed(0)}% công suất`,
      className: 'bg-purple-600/10 text-purple-600',
    },
    {
      title: 'Hoá đơn quá hạn',
      value: `${dashboard?.summary.unpaidInvoicesThisMonth} / ${dashboard?.summary.totalInvoicesThisMonth}`,
      icon: AlertCircle,
      description: 'Cần xử lý',
      className: 'bg-red-600/10 text-red-600',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <SignupModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div>
        <h1 className="text-3xl font-medium mb-2">Tổng quan</h1>
        <p className="text-muted-foreground">
          Thống kê và tổng quan hệ thống quản lý nhà trọ
        </p>
      </div>
      <Button onClick={handleAddLessor}>Thêm Lessor</Button>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.className}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Houses Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách nhà trọ</CardTitle>
            <Link to="/houses">
              <Button variant="outline" size="sm">
                Xem tất cả
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summaryHouse?.map((house) => (
              <Link
                key={house.id}
                to={`/houses/${house.id}`}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{house.name}</h3>
                  <p className="text-sm text-muted-foreground">{house.address}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-medium">
                    {formatCurrency(house.actualMonthlyRevenue)} / {formatCurrency(house.expectedMonthlyRevenue)} 
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {house.occupiedRooms} / {house.totalRooms} phòng
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
