import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";

export const houseService = {
  getAllHouseByUserId(lessorId: number) {
    return baseFetch(
      async () => {
        return await supabase.rpc("get_houses_with_room_stats", {
          p_lessor_id: lessorId,
        });
      },
      {
        context: "houseService.getAllHouseByUserId",
        errorMessage: "Không thể tải danh sách nhà",
      },
    );
  },

  getHouseById(houseId: number) {
    return baseFetch(
      async () => {
        return await supabase.rpc("get_house_detail", {
          p_house_id: houseId,
        });
      },
      {
        context: "houseService.getHouseById",
        errorMessage: "Không thể tải thông tin nhà",
      },
    );
  },
};
