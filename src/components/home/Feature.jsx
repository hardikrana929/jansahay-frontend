import { useTranslation } from "react-i18next";
import { FaUserGraduate, FaSearch, FaHeart } from "react-icons/fa";

const Feature = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaSearch size={40} />,
      title: t("home.features.search.title"),
      desc: t("home.features.search.desc"),
    },

    {
      icon: <FaUserGraduate size={40} />,
      title: t("home.features.recommend.title"),
      desc: t("home.features.recommend.desc"),
    },

    {
      icon: <FaHeart size={40} />,
      title: t("home.features.save.title"),
      desc: t("home.features.save.desc"),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-5">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold">{t("home.features.heading")}</h2>

        <p className="mt-4 text-gray-500">{t("home.features.subheading")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
          >
            <div className="text-blue-600 flex justify-center">{item.icon}</div>

            <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

            <p className="mt-3 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
