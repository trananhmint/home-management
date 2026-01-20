import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";



export const houseService = {
    getAllHouseByUserId(userId: number) {
        return baseFetch(
            async () => {
                return await supabase.from("houses").select("*").eq("lessorId", userId);
            }, {
                context: "houseService.getAllHouseByUserId",
                errorMessage: "Không thể tải danh sách nhà",
            }
        )
    },
    
}