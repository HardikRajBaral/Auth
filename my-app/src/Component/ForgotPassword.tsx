import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const ForgotPassword = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ api?: string }>({});
  const [isVerified, setIsVerified] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setemail] = useState("");
  const [emailInput, setEmailInput] = useState(false);
  const navigate = useNavigate();

  const ResendVerification = async (e: React.MouseEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/apis/auth/resend-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setErrors({
          api: data.message ?? "Could not resend verification code",
        });
        return;
      }
      console.log("Resending Verification Code sucessfully");
    } catch (error) {
      setErrors({ api: "Error occured during verifcation" });
      console.error("Error resending verification code:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/apis/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ api: data.message ?? "Verification failed." });
        return;
      }
      setIsVerified(true);
      console.log("Verification successful");
    } catch (error) {
      setErrors({ api: "Error occured during verifcation" });
      console.error("Error resending verification code:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setErrors({ api: "Email is required" });
      setIsLoading(false);
      return;
    }

    const res = await fetch("http://localhost:3000/apis/auth/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrors({ api: data.message ?? "Could not send reset email" });
      setIsLoading(false);
      return;
    }
    setEmailInput(true);
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setErrors({ api: "Password donot match" });
      setIsLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setErrors({ api: "Password must be at least 6 characters" });
      setIsLoading(false);
      return;
    }
    const res = await fetch("http://localhost:3000/apis/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrors({ api: data.message ?? "Could not reset Password" });
      return;
    }
    navigate("/");
    setemail("");
    setVerificationCode("");
    setPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    setEmailInput(false);
    setIsVerified(false);
    setIsLoading(false);
    console.log("password reset sucessful");
  };
  return (
    <AuthLayout
      eyebrow="Password recovery"
      title="Reset access"
      description="Move through the recovery steps in the same layout, so the process feels steady instead of fragmented."
      points={[
        {
          title: "Email first",
          text: "We send the recovery code to the address you own.",
        },
        {
          title: "Code check",
          text: "Verify the code before setting a new password.",
        },
        {
          title: "Fresh password",
          text: "Choose something new once the code is confirmed.",
        },
      ]}
    >
      {isVerified ? (
        <>
          <div className="auth-card-head">
            <div className="auth-kicker">Step 3 of 3</div>
            <h2>Create a new password</h2>
            <p>Use a password you have not used here before.</p>
          </div>
          <form className="auth-form" onSubmit={handleForgotPassword}>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
              />
            </label>
            <label className="field">
              <span>New password</span>
              <div className="input-shell">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  autoComplete="new-password"
                />
                <button
                  className="toggle-button"
                  type="button"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <label className="field">
              <span>Confirm password</span>
              <div className="input-shell">
                <input
                  type={show ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                />
                <button
                  className="toggle-button"
                  type="button"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            {errors.api && <div className="error-banner">{errors.api}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="primary-button"
            >
              {isLoading ? "Submitting..." : "Update password"}
            </button>
          </form>
        </>
      ) : emailInput ? (
        <>
          <div className="auth-card-head">
            <div className="auth-kicker">Step 2 of 3</div>
            <h2>Check your inbox</h2>
            <p>
              A verification code was sent to {email || "your email address"}.
            </p>
          </div>
          <div className="note-box">
            If the message does not arrive, check spam or resend a fresh code.
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Verification code</span>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                }}
              />
            </label>
            {errors.api && <div className="error-banner">{errors.api}</div>}

            <button
              disabled={isLoading}
              type="submit"
              className="primary-button"
            >
              {isLoading ? "Submitting..." : "Verify code"}
            </button>
          </form>
          <button
            className="secondary-button"
            disabled={isLoading}
            onClick={ResendVerification}
            type="button"
          >
            Resend code
          </button>
        </>
      ) : (
        <>
          <div className="auth-card-head">
            <div className="auth-kicker">Step 1 of 3</div>
            <h2>Start password recovery</h2>
            <p>
              Enter the email attached to your account and we will send the
              recovery step.
            </p>
          </div>
          <form className="auth-form" onSubmit={handleEmailSubmit}>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                autoComplete="email"
              />
            </label>
            {errors.api && <div className="error-banner">{errors.api}</div>}
            <button
              disabled={isLoading}
              type="submit"
              className="primary-button"
            >
              {isLoading ? "Submitting..." : "Send recovery email"}
            </button>
          </form>
          <div className="auth-footer">
            <Link className="inline-link" to="/">
              Back to sign in
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
