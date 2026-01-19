export interface Tenant {
  //id
  role: "TENANT" |"LESSOR";
  id: number;
  identityNo: number;
  fullName: string;
  password?: string;
  phone?: string;
  //identity card
  gender: boolean; //true: male
  dateOfBirth?: string;
  portrait?: string;
  idCardFront?: string;
  idCardBack?: string;
  issuedDate?: string;
  permanentAddress?: string;
  //living info
  createdAt?: string;
}


export interface Invoice {
  //invoice
  id: number;
  roomId: number;
  term: string; // YYYY-MM format
  //expenses
  rent: number;
  electricity: number;
  water: number;
  internet: number;
  garbage: number;
  management: number;
  otherFees: number;
  //payment
  total: number;
  paidAmount: number;
  status: 'paid' | 'partial' | 'unpaid' | 'overdue';
  // dueDate: string;
  paidDate?: string;
  createdAt: string;
}

export interface Room {
  id: number;
  houseId: number;
  name: string;
  price: number;
  numberOfTenants?: number;
  createdAt: string;
  isOccupied: boolean;
}

export interface House {
  id: number;
  lessorId?: number;
  name: string;
  address: string;
  totalRooms: number;
  occupiedRooms: number;
  monthlyRevenue: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'manager';
}
