import type { AuthError, PostgrestError, Session } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

export type Dashboard {
  house: SummaryHouse[];
  summary: {
    occupiedRooms: number | 0,
    totalExpectedMonthlyRevenue: number | 0,
    totalHouses: number | 0,
    totalInvoicesThisMonth: number | 0,
    totalMonthlyRevenue: number | 0,
    totalRooms: number | 0,
    unpaidInvoicesThisMonth: number | 0,
  }
};

export interface Profile {
  id: number;
  email: string;
  fullName: string;
  // taxNo?: string;
  gender: boolean;
  dateOfBirth?: Date;
  dateOfIssue?: Date;
  identityNo?: string;
  permanentAddress?: string;
  phone?: string;
  role: "LESSOR" | "TENANT";
};

export type SummaryHouse = {
  id: number;
  name: string;
  address: string;
  totalRooms: number;
  occupiedRooms: number;
  expectedMonthlyRevenue: number;
  actualMonthlyRevenue: number;
}

export interface Tenant {
  //id
  role: "TENANT" | "LESSOR";
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
};

export type SupabaseError = AuthError | PostgrestError | null;

export type SupabaseResult<T> = {
  data: T | null;
  error: string | null;
};
export type SupabaseResponse<T> = {
  data: T | null;
  error: string | null;
};

export type SupabaseRawResponse<T> = {
  data: T | null;
  error: SupabaseError;
};

export type BaseFetchOptions = {
  context?: string;
  errorMessage?: string;
  showToast?: boolean;
};

export interface Invoice {
  //invoice
  id: number;
  term: string; // YYYY-MM format
  paymentStatus: "PAID" | "UNPAID" | "OVERDUE";

  roomId: number;
  roomName: string;

  houseId: number;
  houseName: string;
  //payment
  // total: number;
  paidAmount: number;
  // dueDate: string;
  paidDate?: string;
  createdAt: string;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  data: Invoice[] | Room[] | Tenant[] | House[];
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
  role: "owner" | "manager";
}
