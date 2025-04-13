"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/_redux/store";
import { fetchAllPackages } from "@/app/_redux/slices/packagesSlice";
import Link from "next/link";
import Error from "../layout/Error";
import LoadingComponent from "../common/LoadingComponent";
import styles from "./packages.module.scss";
import RenderSubscriptionCard from "@/app/dashboard/subscriptions/_components/PackageCard";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function Packages() {
  const { t } = useTranslation();
  const {
    packagesSlice: { data, error, loading },
    authSlice: { token },
  } = useSelector((state: RootState) => state);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (data && data.length < 1) dispatch(fetchAllPackages());
  }, []);

  if (error) {
    return <Error />;
  }

  if (loading || !data) {
    return <LoadingComponent />;
  }

  return (
    <>
      {data.length > 0 && (
        <section className={styles.packagesSection} id="packages">
          <div className={styles.container}>
            <div className={styles.header}>
              <Link
                href={token ? "/dashboard/subscriptions" : `/login`}
                className={styles.viewAllLink}
              >
                {t("packages.viewAll")}
              </Link>
              <h2>{t("packages.title")}</h2>
              <p>{t("packages.description")}</p>
            </div>
            <div className={styles.packagesGrid}>
              {data.slice(1, 4).map((subscription) => (
                <RenderSubscriptionCard
                  key={subscription._id}
                  subscription={subscription}
                  token={token}
                  router={router}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Packages;
