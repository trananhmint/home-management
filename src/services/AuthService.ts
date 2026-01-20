import type { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";

export const authService = {
  signUp(email: string, password: string) {
    return baseFetch(() =>
      supabase.auth.signUp({ email, password }),
      {
        context: "authService.signUp",
        errorMessage: "Không thể đăng ký tài khoản",
      }
    );
  },

  signIn(email: string, password: string) {
    return baseFetch(() =>
      supabase.auth.signInWithPassword({ email, password }),
      {
        context: "authService.signIn",
        errorMessage: "Email hoặc mật khẩu không đúng",
      }
    );
  },

  getSession() {
    return baseFetch<{ session: Session | null }>(
      () => supabase.auth.getSession(),
      {
        context: "authService.getSession",
        errorMessage: "Không thể lấy phiên đăng nhập",
      }
    );
  },

  signOut() {
    return baseFetch(() => supabase.auth.signOut(), {
      context: "authService.signOut",
      errorMessage: "Không thể đăng xuất",
    });
  },

  onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ) {
    const { data } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(event, session);
      }
    );

    return {
      unsubscribe() {
        data.subscription.unsubscribe();
      },
    };
  },
};
