import type { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase-client";
import { baseFetch } from "./baseFetch";
type SignUpPayload = {
  email: string;
  password: string;
  fullName: string;
  role: "LESSOR" | "TENANT";
};
export const authService = {
  signUpLessor(payload: SignUpPayload) {
    return baseFetch(
      async () => {
        const { data, error } = await supabase.auth.signUp({
          email: payload.email,
          password: payload.password,
        });

        if (error) {
          throw error;
        }
        const authUser = data.user;
        if (!authUser) {
          throw new Error("Không thể tạo tài khoản");
        }

        const result = await supabase.from("users").insert({
          auth_user_id: authUser.id,
          email: payload.email,
          fullName: payload.fullName,
          role: "LESSOR",
        });

        return result;
      },
      {
        context: "authService.signUp",
        errorMessage: "Không thể đăng ký tài khoản",
      },
    );
  },
  signUp(email: string, password: string) {
    return baseFetch(() => supabase.auth.signUp({ email, password }), {
      context: "authService.signUp",
      errorMessage: "Không thể đăng ký tài khoản",
    });
  },

  signIn(email: string, password: string) {
    return baseFetch(
      () => supabase.auth.signInWithPassword({ email, password }),
      {
        context: "authService.signIn",
        errorMessage: "Email hoặc mật khẩu không đúng",
      },
    );
  },

  getSession() {
    return baseFetch<{ session: Session | null }>(
      () => supabase.auth.getSession(),
      {
        context: "authService.getSession",
        errorMessage: "Không thể lấy phiên đăng nhập",
      },
    );
  },

  signOut() {
    return baseFetch(() => supabase.auth.signOut(), {
      context: "authService.signOut",
      errorMessage: "Không thể đăng xuất",
    });
  },

  onAuthStateChange(
    callback: (event: string, session: Session | null) => void,
  ) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    return {
      unsubscribe() {
        data.subscription.unsubscribe();
      },
    };
  },
};
