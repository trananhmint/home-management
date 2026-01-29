import { supabase } from "../supabase-client";
import type { Profile } from "../types";
import { baseFetch } from "./baseFetch";

export const userService = {
  getUserProfile(authId: string | null = null) {
    return baseFetch(
      async () => {
        return await supabase
          .from("users")
          .select("*")
          .eq("auth_user_id", authId)
          .single();
      },
      {
        context: "userService.getUserProfile",
        errorMessage: "Không thể tải thống tin người dùng",
      },
    );
  },

  updateUserProfile(payload: Profile) {
    return baseFetch(
      async () => {
        return await supabase
          .from("users")
          .update(payload)
          .eq("id", payload.id);
      },
      {
        context: "userService.updateUserProfile",
        errorMessage: "Không thể cập nhật thống tin người dùng",
      },
    );
  },

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

  getAllTenants(lessorId: number | null = null) {
    console.log("tenanats");

    return baseFetch(
      async () => {
        // return await supabase.from("users").select("*").eq("role", "TENANT");
        return await supabase.rpc("get_active_tenants_by_lessor", {
          p_lessor_id: 3,
        });
      },
      {
        context: "userService.getAllTenants",
        errorMessage: "Không thể tải danh sách user",
      },
    );
  },

  getAllTenantsByRoomId(roomId: number) {
    return baseFetch(
      async () => {
        return await supabase
          .from("room_tenants")
          .select("*")
          .eq("room_id", roomId);
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
        errorMessage: "Tạo user thành công",
      },
    );
  },
};
