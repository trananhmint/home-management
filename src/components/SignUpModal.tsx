import { useState } from "react";
import { userService } from "../services/UserService";
import { authService } from "../services/AuthService";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SignupModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Vui lòng nhập họ tên";
    if (!form.email.trim()) return "Vui lòng nhập email";
    if (form.password.length < 6)
      return "Mật khẩu tối thiểu 6 ký tự";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await authService.signUpLessor({
      email: form.email,
      password: form.password,
      fullName: form.fullName,
      role: "LESSOR",
    });

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 text-gray-800 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[380px] rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-black">
          Tạo tài khoản LESSOR
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Họ và tên"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-black"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-black"
          />

          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-black"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md"
            >
              Huỷ
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-black text-white rounded-md disabled:opacity-60"
            >
              {loading ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
