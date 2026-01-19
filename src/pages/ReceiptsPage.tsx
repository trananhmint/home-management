
import { FileText, Download } from 'lucide-react';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { formatCurrency, formatDate, formatMonth } from '../utils/format';
import { mockHouses, mockInvoices, mockRooms } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export function ReceiptsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getRoomName = (roomId: string) => {
    const room = mockRooms.find((r) => r.id === roomId);
    if (!room) return roomId;
    const house = mockHouses.find((h) => h.id === room.houseId);
    return `${room.name} - ${house?.name}`;
  };

  const filteredInvoices = mockInvoices
    .filter((inv) => filterStatus === 'all' || inv.status === filterStatus)
    .sort((a, b) => b.month.localeCompare(a.month));

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = filteredInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const unpaidAmount = totalAmount - paidAmount;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium mb-2">Quản lý hoá đơn</h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý hoá đơn hàng tháng
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng hoá đơn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredInvoices.length} hoá đơn
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Đã thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-green-600">{formatCurrency(paidAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((paidAmount / totalAmount) * 100).toFixed(1)}% tổng số
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Còn lại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-red-600">{formatCurrency(unpaidAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cần thu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="paid">Đã thanh toán</SelectItem>
            <SelectItem value="partial">Trả một phần</SelectItem>
            <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
            <SelectItem value="overdue">Quá hạn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hoá đơn</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tháng</TableHead>
                  <TableHead>Phòng</TableHead>
                  <TableHead>Tiền thuê</TableHead>
                  <TableHead>Điện/Nước</TableHead>
                  <TableHead>Tổng cộng</TableHead>
                  <TableHead>Đã trả</TableHead>
                  <TableHead>Còn lại</TableHead>
                  <TableHead>Hạn trả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{formatMonth(invoice.month)}</TableCell>
                    <TableCell>{getRoomName(invoice.roomId)}</TableCell>
                    <TableCell>{formatCurrency(invoice.rent)}</TableCell>
                    <TableCell>
                      {formatCurrency(invoice.electricity + invoice.water)}
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(invoice.total)}</TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(invoice.paidAmount)}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {formatCurrency(invoice.total - invoice.paidAmount)}
                    </TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Không có hoá đơn nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
