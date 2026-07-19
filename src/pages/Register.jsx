import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHandsHelping,
} from "react-icons/fa";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const data = await register(form);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg mb-4">
            <FaHandsHelping className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">JanSahay</h1>
          <p className="text-gray-500 text-sm mt-1">
            Government schemes, made simple
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create account
          </h2>
          <p className="text-gray-500 mb-6">
            Sign up to find schemes made for you
          </p>

          <div className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              icon={FaUser}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              icon={FaEnvelope}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                icon={FaLock}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <Button text="Create Account" loading={loading} />
          </div>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-medium ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
