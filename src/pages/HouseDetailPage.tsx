import { useParams, Link } from 'react-router-dom';
import { mockHouses, mockInvoices, mockRooms, mockTenants } from '../data/mockData';
import { Button } from '../components/ui/button';
import { ArrowLeft, DoorOpen, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { formatCurrency } from '../utils/format';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { StatusBadge } from '../components/StatusBadge';

export function HouseDetailPage() {
  const { houseId } = useParams<{ houseId: string }>();
  const house = mockHouses.find((h) => h.id === houseId);
  const rooms = mockRooms.filter((r) => r.houseId === houseId);

  if (!house) {
    return (
      <div className="p-8">
        <p>Không tìm thấy nhà trọ</p>
      </div>
    );
  }

  const getRoomPaymentStatus = (roomId: string) => {
    const latestInvoice = mockInvoices
      .filter((inv) => inv.roomId === roomId)
      .sort((a, b) => b.month.localeCompare(a.month))[0];
    return latestInvoice?.status || 'unpaid';
  };

  const getTenantName = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room?.currentTenantId) return '-';
    const tenant = mockTenants.find((t) => t.id === room.currentTenantId);
    return tenant?.name || '-';
  };

  const paidRooms = rooms.filter((r) => getRoomPaymentStatus(r.id) === 'paid').length;
  const partialRooms = rooms.filter((r) => getRoomPaymentStatus(r.id) === 'partial').length;
  const unpaidRooms = rooms.filter((r) => {
    const status = getRoomPaymentStatus(r.id);
    return status === 'unpaid' || status === 'overdue';
  }).length;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/houses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-medium mb-2">{house.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{house.address}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Doanh thu tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{formatCurrency(house.monthlyRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Đã thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-green-600">{paidRooms} phòng</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trả một phần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-yellow-600">{partialRooms} phòng</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Chưa thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-red-600">{unpaidRooms} phòng</div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phòng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phòng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Khách thuê</TableHead>
                <TableHead>Giá thuê</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <DoorOpen className="h-4 w-4 text-muted-foreground" />
                      {room.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={room.status} />
                  </TableCell>
                  <TableCell>{getTenantName(room.id)}</TableCell>
                  <TableCell>{formatCurrency(room.monthlyRent)}</TableCell>
                  <TableCell>
                    {room.status === 'occupied' && (
                      <StatusBadge status={getRoomPaymentStatus(room.id)} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/rooms/${room.id}`}>
                      <Button variant="ghost" size="sm">
                        Chi tiết
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
