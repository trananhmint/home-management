import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";

export const dashboardService = {
  getLessorDashboard() {
    return baseFetch(
      async () => {
        return await supabase.rpc("get_lessor_dashboard", {
          p_lessor_id: 3,
        });
      },
      {
        context: "dashboardService.getDashboard",
        errorMessage: "Không thể tài dashboard",
      },
    );
  },
};
