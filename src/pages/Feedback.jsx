import { useTranslation } from "react-i18next";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/common/PageHeader";
import FeedbackForm from "../components/feedback/FeedbackForm";

const Feedback = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <PageHeader
        title={t("feedback.title")}
        subtitle={t("feedback.subtitle")}
      />

      <div className="max-w-2xl mx-auto">
        <FeedbackForm />
      </div>
    </MainLayout>
  );
};

export default Feedback;
