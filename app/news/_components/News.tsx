"use client";

import { useEffect, useState } from "react";
import styles from "../_style/News.module.scss";
import CustomNavbar from "../../_components/layout/Navbar";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../_redux/store";
import { fetchAllNews, fetchSliderNews } from "../../_redux/slices/newsSlice";
import Footer from "../../_components/layout/Footer";
import dynamic from "next/dynamic";
import NewsModal from "./NewsModal";
import LoadingComponent from "@/app/_components/common/LoadingComponent";
import Error from "@/app/_components/layout/Error";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 8;

const DisplayAllNews = dynamic(() => import("./DisplayAllNews"), {
  ssr: true,
  loading: () => <LoadingComponent />,
});

export default function SportsNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Record<string, any> | null>(
    null
  );
  const { t } = useTranslation();
  const {
    newsSlice: {
      sliderData,
      loadingSlider,
      errorSlider,
      data,
      loading,
      error,
      totalPages,
    },
    authSlice: { token },
  } = useSelector((state: RootState) => state);

  const handleNewsClick = (newsItem: Record<string, any>) => {
    setSelectedNews(newsItem);
    setShowModal(true);
  };

  useEffect(() => {
    if (token && sliderData.length === 0) dispatch(fetchSliderNews());

    dispatch(fetchAllNews({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [currentPage]);

  if (error || errorSlider) {
    return <Error />;
  }
  if (data) {
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
      <div>
        {/* Header */}
        <CustomNavbar />
        <section className="container py-4">
          {/* Hot Topics Section */}
          <section>
            <h1 className={styles.sectionTitle}>{t("news.Hot Topics")}</h1>
            <Carousel className={styles.heroSection}>
              {sliderData?.map((item: Record<string, any>) => (
                <Carousel.Item
                  key={item._id}
                  onClick={() => handleNewsClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "inherit",
                      width: "100%",
                    }}
                  >
                    <img
                      src={item.media}
                      alt={item.title}
                      loading="lazy"
                      // className={styles.heroImage}
                      style={{
                        width: "auto",
                      }}
                    />
                    <Carousel.Caption className={styles.heroContent}>
                      <h2>{item.title}</h2>
                      <p>{item.newsData.slice(0, 20)}...</p>
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>

          {/* Latest News Section */}

          {loading ? (
            <LoadingComponent />
          ) : (
            data && (
              <DisplayAllNews
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                data={data}
                onNewsClick={handleNewsClick}
              />
            )
          )}
        </section>

        <Footer />

        <NewsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          newsItem={selectedNews}
        />
      </div>
    );
  }
}
