
import { User, Phone, MapPin, UserPlus } from 'lucide-react';

import { useEffect, useState } from 'react';
import { mockHouses, mockRooms, mockTenants } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { formatDate } from '../utils/format';
import { userService } from '../services/UserService';

export function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState<any>([]);

  const getRoomInfo = (tenantId: string) => {
    const room = mockRooms.find((r) => r.currentTenantId === tenantId);
    if (!room) return null;
    const house = mockHouses.find((h) => h.id === room.houseId);
    return { room, house };
  };

  // const filteredTenants = mockTenants.filter((tenant) =>
  //   tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   tenant.phone.includes(searchTerm)
  // );


  const fetchGetTenants = async () => {
    const { data, error } = await userService.getAllTenants();
    console.log(">>> Tenants", data);

    error? console.log("Lỗi tải tenants"): setTenants(data ?? []);
  } 

  useEffect(() => {
    fetchGetTenants();
  }, [])  
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium mb-2">Quản lý khách thuê</h1>
          <p className="text-muted-foreground">
            Danh sách và thông tin khách thuê
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Thêm khách thuê
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => {
          const roomInfo = getRoomInfo(tenant.identityNo);
          return (
            <Card key={tenant.identityNo}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{tenant.fullName}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{tenant.phone || "N/A"}</span>
                </div>
                
                {roomInfo && (
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{roomInfo.room.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {roomInfo.house?.name}
                        </div>
                      </div>
                    </div>
                    {tenant.moveInDate && (
                      <div className="text-xs text-muted-foreground">
                        Ngày vào: {formatDate(tenant.moveInDate) || "N/A"}
                      </div>
                    )}
                  </div>
                )}

                <Button variant="outline" className="w-full mt-4">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {tenants.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Không tìm thấy khách thuê nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
