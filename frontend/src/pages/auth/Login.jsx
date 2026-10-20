
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import GlassCard from "../../components/ui/GlassCard";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    try {
      const data = await loginUser({ email, password });

      login(data);

      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response
          ? (error.response?.status === 404 ? "API route not found (404). Backend service is unreachable." : "Unable to log in. Please check your credentials.")
          : "Cannot connect to the server. Check that the backend is running.");

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <GlassCard className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Login;
