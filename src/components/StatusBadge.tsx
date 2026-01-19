import { Badge } from "./ui/badge";


interface StatusBadgeProps {
  status: 'paid' | 'partial' | 'unpaid' | 'overdue' | 'occupied' | 'vacant';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'paid':
        return { label: 'Đã thanh toán', variant: 'default' as const, className: 'bg-green-600 hover:bg-green-700' };
      case 'partial':
        return { label: 'Trả một phần', variant: 'secondary' as const, className: 'bg-yellow-600 hover:bg-yellow-700 text-white' };
      case 'unpaid':
        return { label: 'Chưa thanh toán', variant: 'outline' as const };
      case 'overdue':
        return { label: 'Quá hạn', variant: 'destructive' as const };
      case 'occupied':
        return { label: 'Đang thuê', variant: 'default' as const, className: 'bg-blue-600 hover:bg-blue-700' };
      case 'vacant':
        return { label: 'Trống', variant: 'outline' as const };
      default:
        return { label: status, variant: 'outline' as const };
    }
  };

  const { label, variant, className } = getStatusInfo();

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
