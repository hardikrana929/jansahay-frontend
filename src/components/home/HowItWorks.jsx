import { FaUserEdit, FaMagic, FaFileSignature } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserEdit size={28} />,
    step: "01",
    title: "Complete Your Profile",
    desc: "Tell us your age, income, occupation, state, and category — it takes less than 2 minutes.",
  },
  {
    icon: <FaMagic size={28} />,
    step: "02",
    title: "Get Matched Instantly",
    desc: "Our engine compares your profile against every active scheme and shows only the ones you're eligible for.",
  },
  {
    icon: <FaFileSignature size={28} />,
    step: "03",
    title: "Apply With Confidence",
    desc: "Review benefits and required documents, then head straight to the official government portal to apply.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800">
            How JanSahay Works
          </h2>
          <p className="mt-4 text-gray-500">
            Three simple steps between you and the benefits you deserve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-xl transition"
            >
              <span className="absolute -top-5 left-8 bg-gradient-to-br from-blue-600 to-green-500 text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                {item.step}
              </span>

              <div className="text-blue-600 mt-4">{item.icon}</div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
