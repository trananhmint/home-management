// // services/supabase/baseFetch.ts
// import { toastError } from "@/utils/toast";
// import { logError } from "@/utils/logger";

type SupabaseResponse<T> = {
  data: T | null;
  error: string | null;
};

type BaseFetchOptions = {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  context?: string;
};


export async function baseFetch<T>(
  request: () => Promise<{
    data: T | null;
    error: any;
    status?: number;
  }>,
  options?: BaseFetchOptions
): Promise<SupabaseResponse<T>> {
  try {
    const { data, error, status } = await request();

    if (error) {
    //   logError(error, options?.context);

      if (options?.showToast !== false) {
        // toastError(
        //   options?.errorMessage ??
        //     error.message ??
        //     "Something went wrong"
        // );
      }

      return {
        data: null,
        error: error.message ?? "SUPABASE_ERROR",
      };
    }

    return {
      data,
      error: null,
    };
  } catch (err) {
    // logError(err, options?.context);

    if (options?.showToast !== false) {
    //   toastError("Network error or unexpected exception");
    }

    return {
      data: null,
      error: "UNEXPECTED_ERROR",
    };
  }
}
