import { FaUserGraduate, FaSearch, FaHeart } from "react-icons/fa";

const Feature = () => {
  const features = [
    {
      icon: <FaSearch size={40} />,
      title: "Search Schemes",
      desc: "Search all government schemes easily.",
    },

    {
      icon: <FaUserGraduate size={40} />,
      title: "Smart Recommendation",
      desc: "Get schemes based on your profile.",
    },

    {
      icon: <FaHeart size={40} />,
      title: "Save Favorites",
      desc: "Bookmark schemes to view later.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-5">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold">Why Choose JanSahay?</h2>

        <p className="mt-4 text-gray-500">
          Everything you need to find and apply for the right scheme, in one
          place.
        </p>
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
