import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";

export const userService = {
  getAllUser() {
    return baseFetch(
      async () => {
        return await supabase.from("users").select("*");
      },
      {
        context: "userService.getAll",
        errorMessage: "Không thể tải danh sách user",
      },
    );
  },
  getAllTenants() {
    console.log("tenanats");

    return baseFetch(
      async () => {
        return await supabase.from("users").select("*").eq("role", "TENANT");
      },
      {
        context: "userService.getAll",
        errorMessage: "Không thể tải danh sách user", 
      },
    );
  },

  getAllTenantsByRoomId(roomId: number) {
    return baseFetch(
      async () => {
        return await supabase.from("room_tenants").select("*").eq("roomId", roomId);
      },
      {
        context: "userService.getAll",
        errorMessage: "Không thể tải danh sách user",
      },
    );
  },

  createTenant(payload: { name: string; email: string }) {
    return baseFetch(
      async () => supabase.from("users").insert(payload).select().single(),
      {
        context: "userService.create",
        successMessage: "Tạo user thành công",
      },
    );
  },
};
