import { useTranslations } from "next-intl";
import Link from "next/link";

export default function RateLimitErrorPage() {

  const t = useTranslations("common");

  return (
    <div className="error-box">
      <p>{t("tooManyRequest")}</p>
      <Link href={"/"} className="btn btn-primary">
        {t("home")}
      </Link>
    </div>
  )
}
