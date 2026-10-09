import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [mode, setMode] = useState("signin");

  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= USERS ================= */

  const getUsers = () => {
    return JSON.parse(
      localStorage.getItem("erpUsers") || "[]"
    );
  };

  const saveUsers = (users) => {
    localStorage.setItem(
      "erpUsers",
      JSON.stringify(users)
    );
  };

  /* ================= SIGN UP ================= */

  const handleSignUp = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !studentId ||
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = getUsers();

    const usernameExists = users.some(
      (user) =>
        user.username.toLowerCase() ===
        username.toLowerCase()
    );

    if (usernameExists) {
      setError(
        "This username is already registered."
      );
      return;
    }

    const studentExists = users.some(
      (user) =>
        user.studentId.toLowerCase() ===
        studentId.toLowerCase()
    );

    if (studentExists) {
      setError(
        "This Student ID is already registered."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      studentId,
      fullName,
      username,
      email,
      password,
    };

    users.push(newUser);

    saveUsers(users);

    setSuccess(
      "Account created successfully! Please sign in."
    );

    setStudentId("");
    setFullName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setMode("signin");
      setSuccess("");
    }, 1500);
  };

  /* ================= SIGN IN ================= */

  const handleSignIn = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username || !password) {
      setError(
        "Please enter your username and password."
      );
      return;
    }

    const users = getUsers();

    const user = users.find(
      (item) =>
        item.username.toLowerCase() ===
          username.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError(
        "Invalid username or password."
      );
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    onLogin(user);
  };

  /* ================= SWITCH ================= */

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  return (
    <div className="login-page">

      {/* ================= LEFT ================= */}

      <div className="login-left">

        <div className="login-brand">

          <div className="login-logo">
            🎓
          </div>

          <div>
            <h2>KLEF</h2>
            <span>
              Student ERP Portal
            </span>
          </div>

        </div>

        <div className="login-intro">

          <span className="login-label">
            STUDENT ERP
          </span>

          <h1>
            {mode === "signin"
              ? "Welcome Back!"
              : "Join the Portal!"}
          </h1>

          <p>
            Access your Register Office
            circulars, academic notices,
            scholarships, examinations
            and university updates in one
            place.
          </p>

          <div className="login-features">

            <div>
              <span>📢</span>
              <p>
                Stay updated with university
                notices
              </p>
            </div>

            <div>
              <span>🔔</span>
              <p>
                Never miss important
                announcements
              </p>
            </div>

            <div>
              <span>🔐</span>
              <p>
                Secure student access
              </p>
            </div>

          </div>

        </div>

        <div className="login-footer">
          © 2026 KLEF Student ERP
        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="login-right">

        <div className="login-card">

          <div className="mobile-logo">
            🎓
          </div>

          {/* TABS */}

          <div className="auth-tabs">

            <button
              className={
                mode === "signin"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                switchMode("signin")
              }
            >
              Sign In
            </button>

            <button
              className={
                mode === "signup"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                switchMode("signup")
              }
            >
              Sign Up
            </button>

          </div>

          {/* TITLE */}

          <h1>
            {mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </h1>

          <p className="login-subtitle">

            {mode === "signin"
              ? "Login to access your student portal"
              : "Create your student ERP account"}

          </p>

          {/* ================= SIGN IN ================= */}

          {mode === "signin" && (

            <form onSubmit={handleSignIn}>

              <div className="form-group">

                <label>
                  Username
                </label>

                <div className="input-wrapper">

                  <span>👤</span>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Password
                </label>

                <div className="input-wrapper">

                  <span>🔒</span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

              {error && (
                <div className="login-error">
                  ⚠️ {error}
                </div>
              )}

              <div className="login-options">

                <label className="remember">

                  <input type="checkbox" />

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert(
                      "Please contact the technical team to reset your password."
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                className="login-button"
              >
                Sign In
                <span>→</span>
              </button>

            </form>

          )}

          {/* ================= SIGN UP ================= */}

          {mode === "signup" && (

            <form onSubmit={handleSignUp}>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Student ID
                  </label>

                  <div className="input-wrapper">

                    <span>🎓</span>

                    <input
                      type="text"
                      placeholder="Student ID"
                      value={studentId}
                      onChange={(e) =>
                        setStudentId(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <div className="input-wrapper">

                    <span>👤</span>

                    <input
                      type="text"
                      placeholder="Full name"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

              <div className="form-group">

                <label>
                  Username
                </label>

                <div className="input-wrapper">

                  <span>@</span>

                  <input
                    type="text"
                    placeholder="Create a username"
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <div className="input-wrapper">

                  <span>📧</span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Password
                </label>

                <div className="input-wrapper">

                  <span>🔒</span>

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <div className="input-wrapper">

                  <span>🔒</span>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {error && (
                <div className="login-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="login-success">
                  ✅ {success}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
              >
                Create Account
                <span>→</span>
              </button>

            </form>

          )}

          {/* HELP */}

          <div className="login-help">

            <span>💬</span>

            <div>

              <strong>
                Need technical help?
              </strong>

              <p>
                Contact the technical team
                if you're facing login or
                registration issues.
              </p>

            </div>

          </div>

          {/* SWITCH */}

          <div className="auth-switch">

            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() =>
                switchMode(
                  mode === "signin"
                    ? "signup"
                    : "signin"
                )
              }
            >
              {mode === "signin"
                ? "Sign Up"
                : "Sign In"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;