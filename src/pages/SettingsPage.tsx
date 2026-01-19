

import { User, Bell, Shield } from 'lucide-react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { useTheme } from '../hooks/useTheme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-medium mb-2">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý tài khoản và cài đặt hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Thông tin tài khoản</CardTitle>
            </div>
            <CardDescription>
              Cập nhật thông tin cá nhân của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input id="name" placeholder="Nguyễn Văn A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0901234567" />
            </div>
            <Button className="w-full">Lưu thay đổi</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Bảo mật</CardTitle>
            </div>
            <CardDescription>
              Quản lý bảo mật tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full" variant="outline">
              Đổi mật khẩu
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Thông báo</CardTitle>
            </div>
            <CardDescription>
              Cài đặt thông báo và nhắc nhở
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Nhắc nhở thanh toán</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi hoá đơn đến hạn
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo khách thuê mới</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi có khách thuê mới
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Báo cáo hàng tháng</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận báo cáo doanh thu cuối tháng
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Giao diện</CardTitle>
            <CardDescription>
              Tùy chỉnh giao diện hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Chế độ tối</Label>
                <p className="text-sm text-muted-foreground">
                  Sử dụng giao diện tối
                </p>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
