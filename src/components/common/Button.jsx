const Button = ({ text, loading, type = "submit" }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default Button;