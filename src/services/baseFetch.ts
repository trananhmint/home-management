import type { BaseFetchOptions, SupabaseRawResponse, SupabaseResult } from "../types";

export async function baseFetch<T>(
  request: () => Promise<SupabaseRawResponse<T>>,
  options?: BaseFetchOptions
): Promise<SupabaseResult<T>> {
  try {
    const res = await request();

    // Supabase luôn trả về error null | object
    if (res.error) {
      const message =
        options?.errorMessage ??
        res.error.message ??
        "Đã xảy ra lỗi từ hệ thống xác thực";

      console.error(
        `[Supabase Error] ${options?.context ?? "unknown"}`,
        res.error
      );

      return {
        data: null,
        error: message,
      };
    }

    return {
      data: res.data,
      error: null,
    };
  } catch (err) {
    console.error(
      `[Unexpected Error] ${options?.context ?? "unknown"}`,
      err
    );

    return {
      data: null,
      error: "Lỗi hệ thống. Vui lòng thử lại sau.",
    };
  }
}
