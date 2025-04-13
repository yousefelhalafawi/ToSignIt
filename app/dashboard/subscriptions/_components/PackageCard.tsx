import { Check } from "lucide-react";
import styles from "../_style/subscription.module.scss";
import { useTranslation } from "react-i18next";

const RenderSubscriptionCard = ({ subscription, router, token }: any) => {
  const { t } = useTranslation();

  return (
    <div key={subscription._id} className={styles.packageCard}>
      <h2 className={styles.packageTitle}>
        {subscription.subscriptionWayName}
      </h2>
      <div className={styles.packagePrice}>
        {subscription.price}
        {subscription.currency}/{subscription.subscriptionWay}
      </div>

      <div className={styles.featureList}>
        <div className={styles.featureItem}>
          <Check size={16} />
          <span>
            {t("subscription.basicSignatures")}{" "}
            <strong>{subscription.basicSignature}</strong>
          </span>
        </div>
        <div className={styles.featureItem}>
          <Check size={16} />
          <span>
            {t("subscription.otpSignatures")}{" "}
            <strong>{subscription.otpSignature}</strong>
          </span>
        </div>
        <div className={styles.featureItem}>
          <Check size={16} />
          <span>
            {t("subscription.integrationSignatures")}{" "}
            <strong>{subscription.integrationSignature}</strong>
          </span>
        </div>
        {subscription.maxUsers !== 0 ? (
          <div className={styles.featureItem}>
            <Check size={16} />
            <span>
              {t("subscription.maxUsers")}{" "}
              <strong>{subscription.maxUsers}</strong>
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.includedSection}>
        <h3>{t("subscription.includedFeatures")}</h3>
        {subscription.features.map((feature: string, index: number) => (
          <div key={index} className={styles.featureItem}>
            <Check size={16} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={styles.subscribeButton}
        onClick={() =>
          router.push(token ? "/dashboard/subscriptions" : `/login`)
        }
      >
        {t("subscription.subscribeNow")}
      </button>
    </div>
  );
};

export default RenderSubscriptionCard;
