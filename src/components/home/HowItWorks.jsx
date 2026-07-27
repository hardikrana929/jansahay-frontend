import { useTranslation } from "react-i18next";
import { FaUserEdit, FaMagic, FaFileSignature } from "react-icons/fa";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <FaUserEdit size={28} />,
      step: "01",
      title: t("home.how.step1.title"),
      desc: t("home.how.step1.desc"),
    },
    {
      icon: <FaMagic size={28} />,
      step: "02",
      title: t("home.how.step2.title"),
      desc: t("home.how.step2.desc"),
    },
    {
      icon: <FaFileSignature size={28} />,
      step: "03",
      title: t("home.how.step3.title"),
      desc: t("home.how.step3.desc"),
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-5 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t("home.how.heading")}
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {t("home.how.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition"
            >
              <span className="absolute -top-5 left-8 bg-gradient-to-br from-blue-600 to-green-500 text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                {item.step}
              </span>

              <div className="text-blue-600 dark:text-blue-400 mt-4">
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
