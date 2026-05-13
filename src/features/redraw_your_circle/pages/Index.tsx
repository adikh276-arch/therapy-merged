import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("intro", { replace: true });
  }, [navigate]);
  return null;
};

export default Index;
