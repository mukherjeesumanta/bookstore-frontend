import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const schema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // Redirect if already logged in — declarative to avoid setState-during-render
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  async function onSubmit(data) {
    const result = await login(data);
    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Brand */}
        <Link to="/" className="login-brand">
          Leaf &amp; Letter
        </Link>

        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">Welcome back — please enter your details.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="login-form">
          {/* Root / server error */}
          {errors.root && (
            <p role="alert" className="login-error-banner">
              {errors.root.message}
            </p>
          )}

          {/* Username */}
          <div className="login-field">
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className={`login-input${errors.username ? " login-input--error" : ""}`}
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.username && (
              <span role="alert" className="login-field-error">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={`login-input${errors.password ? " login-input--error" : ""}`}
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <span role="alert" className="login-field-error">
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="login-submit">
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
