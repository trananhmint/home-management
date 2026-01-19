
import { Building2, DoorOpen, DollarSign, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockHouses, mockInvoices, mockRooms } from '../data/mockData';
import { formatCurrency } from '../utils/format';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { supabase } from '../supabase-client';
import { useEffect, useState } from 'react';
import { userService } from '../services/UserService';


export function DashboardPage() {
  const totalRevenue = mockHouses.reduce((sum, house) => sum + house.monthlyRevenue, 0);
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter((r) => r.status === 'occupied').length;
  const overdueInvoices = mockInvoices.filter((inv) => inv.status === 'overdue').length;

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const { data, error } = await userService.getAllTenants();

    error? console.log("Lỗi tải user"): setUsers(data ?? []);
  }

  const fetchAddUser = async () => {
    const res = await supabase.from("users").insert(
      { username: "example@email", role: "owner", password: "123" },
    ).single();
    console.log(res);
  }

  console.log(">>> Users", users);


  useEffect(() => {
    fetchUsers();
  }, [])

  const stats = [
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      description: 'Doanh thu tháng này',
      className: 'bg-green-600/10 text-green-600',
    },
    {
      title: 'Tổng nhà trọ',
      value: mockHouses.length,
      icon: Building2,
      description: `${totalRooms} phòng`,
      className: 'bg-blue-600/10 text-blue-600',
    },
    {
      title: 'Phòng đang thuê',
      value: `${occupiedRooms}/${totalRooms}`,
      icon: DoorOpen,
      description: `${((occupiedRooms / totalRooms) * 100).toFixed(0)}% công suất`,
      className: 'bg-purple-600/10 text-purple-600',
    },
    {
      title: 'Hoá đơn quá hạn',
      value: overdueInvoices,
      icon: AlertCircle,
      description: 'Cần xử lý',
      className: 'bg-red-600/10 text-red-600',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-medium mb-2">Tổng quan</h1>
        <p className="text-muted-foreground">
          Thống kê và tổng quan hệ thống quản lý nhà trọ
        </p>
      </div>
      <Button onClick={fetchAddUser}>Thêm user</Button>

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
            {mockHouses.map((house) => (
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
                    {formatCurrency(house.monthlyRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {house.occupiedRooms}/{house.totalRooms} phòng
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
