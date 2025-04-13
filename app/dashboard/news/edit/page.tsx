"use client";

import { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import styles from "./_style/News.module.scss";
import NewsTable from "./_components/NewsTable";
import HotTopicsTable from "./_components/HotTopics";
import { useTranslation } from "react-i18next";

export default function page() {
  const [key, setKey] = useState("news");
  const { t } = useTranslation();

  return (
    <Container className={styles.container}>
      <h1 className={styles.header}>{t("newsAdmin.News Management")}</h1>

      <Tabs
        id="news-management-tabs"
        activeKey={key}
        onSelect={(k: any) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="news" title={t("newsAdmin.News")}>
          <div className={styles.tabContent}>
            <NewsTable />
          </div>
        </Tab>
        <Tab eventKey="hot-topics" title={t("newsAdmin.Hot Topics")}>
          <div className={styles.tabContent}>
            <HotTopicsTable />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}
