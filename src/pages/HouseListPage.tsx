
import { Link } from 'react-router-dom';
import { Building2, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { formatCurrency } from '../utils/format';
import { houseService } from '../services/HouseService';
import { useEffect, useState } from 'react';
import type { House } from '../types';
import { useUser } from '../providers/UserProvider';


export function HouseListPage() {
  const { user } = useUser();

  const [houses, setHouses] = useState<House[]>([]);

  const fetchHouses = async () => {
    const { data, error } = await houseService.getAllHouseByUserId(3);
    console.log(">>> Houses", data, error);
    setHouses(data || []);
  }

  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium mb-2">Danh sách nhà trọ</h1>
          <p className="text-muted-foreground">
            Quản lý các nhà trọ và phòng của bạn
          </p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Thêm nhà trọ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house) => (
          <Link key={house.id} to={`/houses/${house.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{house.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{house.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Doanh thu/tháng</span>
                    <span className="font-medium">{formatCurrency(house.monthlyRevenue ?? 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tổng phòng</span>
                    <span className="font-medium">{house.totalRooms ?? 0} phòng</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Đang thuê</span>
                    <span className="font-medium text-green-600">
                      {house.occupiedRooms ?? 0}/{house.totalRooms ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Công suất</span>
                    <span className="font-medium">
                      {((house.occupiedRooms  / house.totalRooms) * 100).toFixed(0) ?? 0} %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
