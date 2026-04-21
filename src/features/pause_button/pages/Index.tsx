import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
          {t('app_title')}
        </h1>
        <p className="text-justified text-muted-foreground font-body mb-8 leading-relaxed">
          {t('app_desc')}
        </p>
        <Button size="lg" className="w-full" onClick={() => navigate("/pause-button")}>
          {t('start_btn')}
        </Button>
        <Button size="lg" variant="outline" className="w-full mt-3" onClick={() => navigate("/pause-history")}>
          {t('view_history_btn')}
        </Button>
      </div>
    </div>
  );
};

export default Index;
