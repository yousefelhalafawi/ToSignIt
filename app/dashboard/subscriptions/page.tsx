"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import styles from "./_style/subscription.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/_redux/store";
import {
  fetchAllPackages,
  StripPayment,
} from "@/app/_redux/slices/packagesSlice";
import Error from "@/app/_components/layout/Error";
import LoadingComponent from "@/app/_components/common/LoadingComponent";
import CenterPosition from "@/app/_components/layout/CenterPosition";
import { useTranslation } from "react-i18next";

const SubscriptionPackages: React.FC = () => {
  const [activeTab, setActiveTab] = useState("individual");
  const [billingCycle, setBillingCycle] = useState<"Monthly" | "Yearly">(
    "Monthly"
  );

  const {
    packagesSlice: { data, error, loading, redirectLoading },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const individualPlans = data?.filter(
    (sub: any) =>
      (!sub.isCompany && sub.subscriptionWayName.endsWith(billingCycle)) ||
      (sub.subscriptionWayName === "Free" && billingCycle === "Monthly")
  );
  const companyPlans = data?.filter((sub: any) => sub.isCompany);

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const handlePayment = (subscription: any) => {
    dispatch(StripPayment({ subscriptionWay: subscription._id }))
      .unwrap()
      .then((response: any) => {
        window.open(response.paymentRedirectUrl, "_self");
      });
  };

  if (error) {
    return <Error />;
  }
  if ((loading || redirectLoading) && data.length == 0) {
    return (
      <CenterPosition>
        <LoadingComponent />
      </CenterPosition>
    );
  }

  const renderSubscriptionCard = (subscription: any) => (
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
        {subscription.maxUsers !== 0 && (
          <div className={styles.featureItem}>
            <Check size={16} />
            <span>
              {t("subscription.maxUsers")}{" "}
              <strong>{subscription.maxUsers}</strong>
            </span>
          </div>
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

      {subscription.subscriptionWayName === "Free" ? null : (
        <button
          className={styles.subscribeButton}
          onClick={() => handlePayment(subscription)}
        >
          {t("subscription.subscribeNow")}
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "individual" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("individual")}
        >
          {t("subscription.individualPlans")}
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "company" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("company")}
        >
          {t("subscription.companyPlans")}
        </button>
      </div>

      {activeTab === "individual" && (
        <>
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${
                billingCycle === "Monthly" ? styles.active : styles.nonActive
              }`}
              onClick={() => setBillingCycle("Monthly")}
            >
              {t("subscription.monthly")}
            </button>
            <button
              className={`${styles.toggleButton} ${
                billingCycle === "Yearly" ? styles.active : styles.nonActive
              }`}
              onClick={() => setBillingCycle("Yearly")}
            >
              {t("subscription.yearly")}
            </button>
          </div>
          <div className={styles.packagesGrid}>
            {individualPlans?.map(renderSubscriptionCard)}
          </div>
        </>
      )}

      {activeTab === "company" && (
        <div className={styles.packagesGrid}>
          {companyPlans?.map(renderSubscriptionCard)}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPackages;
