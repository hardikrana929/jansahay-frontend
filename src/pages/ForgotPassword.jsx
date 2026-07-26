import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHandsHelping,
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import {
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../services/authService";

const RESEND_SECONDS = 60;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // "email" -> "otp" -> "password" -> "success"
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (resendTimer <= 0) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [resendTimer > 0]);

  // Step 1: request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error(t("auth.forgotPassword.enterEmail"));
    }

    try {
      setLoading(true);
      const data = await forgotPassword(email);
      toast.success(data.message);
      setStep("otp");
      setResendTimer(RESEND_SECONDS);
    } catch (error) {
      toast.error(error.response?.data?.message || t("common.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error(t("auth.forgotPassword.enterValidOtp"));
    }

    try {
      setLoading(true);
      const data = await verifyResetOTP(email, otp);
      toast.success(data.message);
      setResetToken(data.resetToken);
      setStep("password");
    } catch (error) {
      toast.error(error.response?.data?.message || t("common.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      setLoading(true);
      const data = await forgotPassword(email);
      toast.success(data.message);
      setOtp("");
      setResendTimer(RESEND_SECONDS);
    } catch (error) {
      toast.error(error.response?.data?.message || t("common.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  // Step 3: set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error(t("auth.forgotPassword.fillAllFields"));
    }
    if (newPassword.length < 6) {
      return toast.error(t("auth.forgotPassword.minPassword"));
    }
    if (newPassword !== confirmPassword) {
      return toast.error(t("auth.forgotPassword.passwordMismatch"));
    }

    try {
      setLoading(true);
      const data = await resetPassword(resetToken, newPassword);
      toast.success(data.message);
      setStep("success");
    } catch (error) {
      toast.error(error.response?.data?.message || t("common.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader text={t("common.pleaseWait")} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg mb-4">
              <FaHandsHelping className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">JanSahay</h1>
            <p className="text-gray-500 text-sm mt-1">
              {t("auth.brandTagline")}
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {["email", "otp", "password"].map((s, index) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step === s ||
                      (step === "success" && s === "password") ||
                      ["otp", "password", "success"].indexOf(step) > index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
                </div>
              ))}
            </div>

            {/* Step 1: Email */}
            {step === "email" && (
              <form onSubmit={handleSendOtp}>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {t("auth.forgotPassword.title")}
                </h2>
                <p className="text-gray-500 mb-6">
                  {t("auth.forgotPassword.subtitle")}
                </p>

                <Input
                  label={t("auth.forgotPassword.emailLabel")}
                  type="email"
                  name="email"
                  placeholder={t("auth.forgotPassword.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={FaEnvelope}
                />

                <div className="mt-6">
                  <Button
                    text={t("auth.forgotPassword.sendOtp")}
                    loading={loading}
                  />
                </div>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp}>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {t("auth.forgotPassword.enterOtp")}
                </h2>
                <p className="text-gray-500 mb-6 break-words">
                  {t("auth.forgotPassword.otpSentTo")}{" "}
                  <span className="font-medium text-gray-700">{email}</span>
                </p>

                <div className="space-y-2">
                  <label className="font-medium text-gray-700">
                    {t("auth.forgotPassword.otpLabel")}
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 py-3 focus-within:border-blue-500 transition">
                    <FaShieldAlt className="mr-3 text-gray-400" size={18} />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      className="flex-1 outline-none bg-transparent tracking-[0.5em] text-lg font-semibold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                  >
                    <FaArrowLeft size={12} />
                    {t("auth.forgotPassword.changeEmail")}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="text-blue-600 font-medium disabled:text-gray-400"
                  >
                    {resendTimer > 0
                      ? t("auth.forgotPassword.resendIn", {
                          seconds: resendTimer,
                        })
                      : t("auth.forgotPassword.resendOtp")}
                  </button>
                </div>

                <div className="mt-6">
                  <Button
                    text={t("auth.forgotPassword.verifyOtp")}
                    loading={loading}
                  />
                </div>
              </form>
            )}

            {/* Step 3: New password */}
            {step === "password" && (
              <form onSubmit={handleResetPassword}>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {t("auth.forgotPassword.setNewPassword")}
                </h2>
                <p className="text-gray-500 mb-6">
                  {t("auth.forgotPassword.setNewPasswordSubtitle")}
                </p>

                <div className="space-y-5">
                  <div className="relative">
                    <Input
                      label={t("auth.forgotPassword.newPasswordLabel")}
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder={t(
                        "auth.forgotPassword.newPasswordPlaceholder",
                      )}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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

                  <Input
                    label={t("auth.forgotPassword.confirmPasswordLabel")}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={t(
                      "auth.forgotPassword.confirmPasswordPlaceholder",
                    )}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={FaLock}
                  />
                </div>

                <div className="mt-6">
                  <Button
                    text={t("auth.forgotPassword.resetPassword")}
                    loading={loading}
                  />
                </div>
              </form>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mt-5">
                  {t("auth.forgotPassword.successTitle")}
                </h2>

                <p className="text-gray-500 mt-2">
                  {t("auth.forgotPassword.successSubtitle")}
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
                >
                  {t("auth.forgotPassword.backToLogin")}
                </button>
              </div>
            )}

            {step !== "success" && (
              <p className="text-center text-gray-600 mt-6">
                {t("auth.forgotPassword.rememberedPassword")}
                <Link
                  to="/login"
                  className="text-blue-600 font-medium ml-2 hover:underline"
                >
                  {t("auth.login.submit")}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
