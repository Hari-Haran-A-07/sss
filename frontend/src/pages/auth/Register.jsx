
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import GlassCard from "../../components/ui/GlassCard";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "team_member",
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

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      const data = await registerUser({
        name,
        email,
        password: form.password,
        role: form.role,
      });

      login(data);

      toast.success("Account created");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response
          ? "Registration failed. Please try again."
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
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={form.name}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

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
            autoComplete="new-password"
            value={form.password}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={form.confirmPassword}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          >
            <option value="team_member">Team Member</option>
            <option value="team_leader">Team Leader</option>
          </select>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Register;
