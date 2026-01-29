import { useParams, Link } from 'react-router-dom';

import { ArrowLeft, User, Phone, DoorOpen } from 'lucide-react';


import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { formatCurrency, formatDate, formatMonth, formatTerm } from '../utils/format';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { roomService } from '../services/RoomService';
import { useEffect, useState } from 'react';
import type { Invoice, Room } from '../types';
import { userService } from '../services/UserService';
import { getInvoiceService } from '../services/InvoiceService';

export function RoomDetailPage() {
  // const { roomId } = useParams<{ roomId: string }>() || 1;
  // const room = mockRooms.find((r) => r.id === roomId);
  const houseId = 1;
  const roomId = 1;
  const [roomDetail, setRoomDetail] = useState<Room>(null!);
  const [tenant, setTenant] = useState<any>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const fetchInvoicesByRoomId = async () => {
    const { data, error } = await getInvoiceService.getAllInvoicesByRoomId(Number(roomId));
    console.log("Invoice data:", data, error);
    if (data && data.length > 0) {
      setInvoices(data);
    }
  }

  const fetchRoomById = async () => {
    const { data, error } = await roomService.getRoomById(Number(houseId));
    console.log("Room data:", data, error);
    setRoomDetail(data!);
  };

  const fetchTenantByRoomId = async () => {
    const { data, error } = await userService.getAllTenantsByRoomId(Number(roomId));
    console.log("Tenant data:", data, error);
    if (data && data.length > 0) {
      setTenant(data);
    }
  }

  useEffect(() => {
    fetchRoomById();
    fetchInvoicesByRoomId();
    fetchTenantByRoomId();
  }, []);

  if (!roomDetail) {
    return (
      <div className="p-8">
        <p>Không tìm thấy phòng</p>
      </div>
    );
  }

  return roomDetail ? (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Link to={`/houses/${roomDetail.houseId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-medium mb-2">{roomDetail.name}</h1>
          {/* <p className="text-muted-foreground">{house?.name}</p> */}
        </div>
        <StatusBadge status={roomDetail.isOccupied ? 'OCCUPIED' : 'VACANT'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Info */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin phòng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Giá thuê/tháng</span>
              {/* <span className="font-medium">{formatCurrency(room.monthlyRent)}</span> */}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Trạng thái</span>
              <StatusBadge status={roomDetail.isOccupied ? 'OCCUPIED' : 'VACANT'} />
            </div>
          </CardContent>
        </Card>

        {/* Tenant Info */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin người thuê</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tenant ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{tenant.name}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {tenant.phone}
                    </div>
                  </div>
                </div>
                {tenant.moveInDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ngày vào ở</span>
                    <span className="font-medium">{formatDate(tenant.moveInDate)}</span>
                  </div>
                )}
                <Link to={`/tenants`}>
                  <Button variant="outline" className="w-full">
                    Xem chi tiết
                  </Button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <DoorOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Phòng đang trống</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử hoá đơn</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kỳ hạn</TableHead>
                  {/* <TableHead>Tiền thuê</TableHead>
                  <TableHead>Điện</TableHead>
                  <TableHead>Nước</TableHead>
                  <TableHead>Khác</TableHead> */}
                  <TableHead>Tổng cộng</TableHead>
                  {/* <TableHead>Đã trả</TableHead> */}
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{formatTerm(invoice.term)}</TableCell>
                    {/* <TableCell>{formatCurrency(invoice.paidAmount)}</TableCell> */}
                    {/* <TableCell>{formatCurrency(invoice.electricity)}</TableCell>
                    <TableCell>{formatCurrency(invoice.water)}</TableCell>
                    <TableCell>
                      {formatCurrency(invoice.internet + invoice.garbage + invoice.management)}
                    </TableCell> */}
                    {/* <TableCell className="font-medium">{formatCurrency(invoice.total)}</TableCell> */}
                    <TableCell>{formatCurrency(invoice.paidAmount)}</TableCell>
                    <TableCell className=''>
                      <StatusBadge status={invoice.paymentStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Chưa có hoá đơn nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  ) :
    (
      <div className="p-8">
        <p>Không tìm thấy phòng</p>
      </div>
    )
}
