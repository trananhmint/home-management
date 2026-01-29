export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('vi-VN');
};

export const formatMonth = (month: string): string => {
  const [year, monthNum] = month.split('-');
  return `Tháng ${monthNum}/${year}`;
};
export const formatTerm = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${month}/${year}`;
};
