"use client";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useLayoutEffect } from "react";
import { fetchSliderNews } from "@/app/_redux/slices/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/_redux/store";
import Error from "../layout/Error";
import LoadingComponent from "../common/LoadingComponent";

function NewsSlider() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    newsSlice: { sliderData, loadingSlider, errorSlider },
    authSlice: { token },
  } = useSelector((state: RootState) => state);

  if (!token) {
    return null;
  }
  useLayoutEffect(() => {
    if (token && sliderData.length === 0) dispatch(fetchSliderNews());
  }, []);

  if (loadingSlider) {
    return <LoadingComponent />;
  }

  if (errorSlider) {
    return <Error />;
  }

  return (
    <Carousel
      data-bs-theme="dark"
      style={{
        height: "250px",
        width: "100% ",
      }}
    >
      {sliderData?.map((item: Record<string, any>) => {
        return (
          <Carousel.Item
            style={{ height: "inherit" }}
            key={item.id || item.title}
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
                style={{ width: "auto" }}
                className="d-block h-100 "
              />
              <Carousel.Caption style={{ color: "white" }}>
                <h5>{item.title}</h5>
                <p>{item.newsData.slice(0, 20)}...</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default NewsSlider;
