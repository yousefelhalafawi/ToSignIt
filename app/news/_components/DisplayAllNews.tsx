import { formatDate } from "@/app/_utils/uttils";
import styles from "../_style/News.module.scss";
import Pagination from "./Pagination";
import { useTranslation } from "react-i18next";

type news = {
  currentPage: number;
  totalPages: number;
  paginate: (args: number) => void;
  data: Record<string, any>;
  onNewsClick: (newsItem: Record<string, any>) => void;
};

export default function DisplayAllNews({
  currentPage,
  totalPages,
  paginate,
  data,
  onNewsClick,
}: news) {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className={styles.sectionTitle}>{t("news.Latest News")}</h2>
      <div className={`row ${styles.newsGrid}`}>
        {data?.map((item: Record<string, any>) => {
          return (
            <div
              key={item._id}
              className="col-md-3"
              style={{
                cursor: "pointer",
              }}
              onClick={() => onNewsClick(item)}
            >
              <div className={`card ${styles.newsCard}`}>
                <img
                  src={item.media}
                  alt={item.newsData}
                  loading="lazy"
                  className={`card-img-top ${styles.cardImage}`}
                />

                <div className="card-body">
                  <h5 className={styles.cardTitle}>{item.title}</h5>
                  <p className={styles.cardText}>
                    <small>{formatDate(item.updatedAt)}</small>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </section>
  );
}
