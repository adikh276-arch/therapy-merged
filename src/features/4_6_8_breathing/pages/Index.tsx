import { useTranslation } from "react-i18next";
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="flex  items-center justify-center bg-transparent">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("welcome_to_your_blank_app")}</h1>
        <p className="text-xl text-muted-foreground">{t("start_building_your_amazing_project_here")}</p>
      </div>
    </div>
  );
};

export default Index;
