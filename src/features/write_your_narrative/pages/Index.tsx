import { useTranslation } from "react-i18next";
// Update this page (the content is just a fallback if you fail to update the page)

// IMPORTANT: Fully REPLACE this with your own code
const PlaceholderIndex = () => {
  const { t } = useTranslation();
  // PLACEHOLDER: Replace this entire return statement with the user's app.
  // The inline background color is intentionally not part of the design system.
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#fcfbf8' }}>
      <img data-lovable-blank-page-placeholder={t("remove_this")} src="/placeholder.svg" alt="Your app will live here!" />
    </div>
  );
};

const Index = PlaceholderIndex;

export default Index;
