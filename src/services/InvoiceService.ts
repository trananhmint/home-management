import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";

export const getInvoiceService = {
  getInvoiceById(invoiceId: number) {
    return baseFetch(
      async () => {
        return await supabase
          .from("invoices")
          .select("*")
          .eq("id", invoiceId)
          .single();
      },
      {
        context: "invoiceService.getInvoiceById",
        errorMessage: "Không thể tải thông tin hóa đơn",
      },
    );
  },
  getAllInvoicesByRoomId(roomId: number) {
    return baseFetch(
      async () => {
        return await supabase.from("invoices").select("*").eq("room_id", roomId);
      },
      {
        context: "invoiceService.getAllInvoicesByRoomId",
        errorMessage: "Không thể tải danh sách hóa đơn",
      },
    );
  },
};
