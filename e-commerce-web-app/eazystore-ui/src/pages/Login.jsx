import React, { useEffect, useState } from "react";
import {
  NavLink,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../context/auth-slice';
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    if (actionData?.success) {
      dispatch(loginSuccess({ jwtToken: actionData.jwtToken, user: actionData.user }));
      localStorage.setItem('jwtToken', actionData.jwtToken);
      localStorage.setItem('user', JSON.stringify(actionData.user));
      toast.success(`Login successful, ${actionData.user.name}...!`);
      sessionStorage.removeItem("redirectPath");
      setTimeout(() => {
        navigate(from);
      }, 100);
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login failed.");
    }
  }, [actionData, dispatch, navigate, from]);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  return (
    <div className="min-h-[752px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        {/* Title (centered like Register page) */}
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <Form method="POST" className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="username"
              placeholder="Your Username"
              className={textFieldStyle}
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Your Password"
              className={textFieldStyle + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[43px] text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-2 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200"
          >
            {isSubmitting ? "Authenticating..." : "Login"}
          </button>
        </Form>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200"
          >
            Register Here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;

export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
      error.message ||
      "Failed to login. Please try again.",
      { status: error.response?.status || 500 }
    );
  }
}