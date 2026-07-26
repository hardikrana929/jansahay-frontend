import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-8 text-center">
        <h2 className="text-3xl font-bold">{t("footer.name")}</h2>

        <p className="mt-3 text-gray-300">{t("footer.tagline")}</p>

        <p className="mt-5 text-sm text-gray-400">
          {t("footer.rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
