import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";

export const roomService = {
  getRoomsByHouseId(houseId: number) {
    return baseFetch(
      async () => {
        return await supabase.from("rooms").select("*").eq("houseId", houseId);
      },
      {
        context: "roomService.getRoomsByHouseId",
        errorMessage: "Không thể tải danh sách phòng theo nhà",
      },
    );
  },
  getRoomById(roomId: number) {
    return baseFetch(
      async () => {
        return await supabase
          .from("rooms")
          .select("*")
          .eq("id", roomId)
          .single();
      },
      {
        context: "roomService.getRoombyId",
        errorMessage: "Không thể tải thông tin phòng",
      },
    );
  },
};
