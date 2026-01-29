import { Badge } from "./ui/badge";


interface StatusBadgeProps {
  status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'OVERDUE' | 'OCCUPIED' | 'VACANT';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'PAID':
        return { label: 'Đã thanh toán', variant: 'default' as const, className: 'bg-green-600 hover:bg-green-700' };
      case 'PARTIAL':
        return { label: 'Trả một phần', variant: 'secondary' as const, className: 'bg-yellow-600 hover:bg-yellow-700 text-white' };
      case 'UNPAID':
        return { label: 'Chưa thanh toán', variant: 'outline' as const };
      case 'OVERDUE':
        return { label: 'Quá hạn', variant: 'destructive' as const };
      case 'OCCUPIED':
        return { label: 'Đang thuê', variant: 'default' as const, className: 'bg-blue-600 hover:bg-blue-700' };
      case 'VACANT':
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
