"use client";
import React, { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../_style/news.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsById } from "../../utils";
import AppInput from "@/app/_components/layout/TextField";
import LoadingSpinner from "@/app/_components/layout/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import ImgComponent from "@/app/_components/layout/ImgComponent";
import CheckBox from "@/app/_components/layout/CheckBox";
import axios from "axios";
import showSuccessToast from "@/app/_utils/SuccessMsg";
import showErrorToast from "@/app/_utils/ErrorMsg";
import { LogoutFunction } from "@/app/_redux/slices/authSlice";
import CenterPosition from "@/app/_components/layout/CenterPosition";
import LoadingComponent from "@/app/_components/common/LoadingComponent";
import { useTranslation } from "react-i18next";

type Inputs = {
  title: string;
  newsData: string;
  media: string;
  special: string;
};

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

export default function EditNews() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = params;
  const { token } = useSelector((state: any) => state.authSlice);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<Inputs | null>(null);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(
          `${endPoint}/api/news`,
          {
            newsId: id,
            title: data.title,
            newsData: data.newsData,
            media: data.media,
            special: data.special,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.responseCode === 200) {
          showSuccessToast(response.data.responseMessage);
          setTimeout(() => {
            router.push("/dashboard/news/edit");
          }, 1000);
        }
      } catch (error: any) {
        if (error.response.data.responseCode === 401) {
          showErrorToast(
            `${
              error?.response?.data?.responseMessage
                ? error.response.data.responseMessage
                : t("editNews.genericError")
            }`
          );
          setTimeout(() => {
            dispatch(LogoutFunction());
          }, 2000);
        }
      }
    });
  };

  useEffect(() => {
    setError(null);
    startTransition(async () => {
      try {
        const {
          data: { news },
        } = await fetchNewsById({ token, id });
        setNewsData(news);
        reset(news);
      } catch (err: any) {
        console.error("Error fetching news:", err);
        setError(t("editNews.fetchError"));
      }
    });
  }, [token, id, reset, t]);

  if (isPending) {
    return (
      <CenterPosition>
        <LoadingComponent />
      </CenterPosition>
    );
  }

  if (error) {
    return (
      <section
        className="p-4 d-flex flex-column"
        style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}
      >
        <h2 className={styles.news}>{t("editNews.pageTitle")}</h2>
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section
      className="p-4 d-flex flex-column"
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <div className="mb-5">
        <h2 className={styles.news}>{t("editNews.editTitle")}</h2>
      </div>

      <section className="flex-grow-1 d-flex">
        <form
          className="d-flex justify-content-between flex-column flex-grow-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AppInput
            label={t("editNews.titleLabel")}
            type="text"
            placeholder={t("editNews.titlePlaceholder")}
            defaultValue={newsData?.title || ""}
            {...register("title", {
              required: t("editNews.titleRequired"),
              minLength: {
                value: 5,
                message: t("editNews.titleMinLength"),
              },
              maxLength: {
                value: 100,
                message: t("editNews.titleMaxLength"),
              },
            })}
            error={errors.title?.message}
          />
          <AppInput
            label={t("editNews.contentLabel")}
            as="textarea"
            placeholder={t("editNews.contentPlaceholder")}
            defaultValue={newsData?.newsData || ""}
            {...register("newsData", {
              required: t("editNews.contentRequired"),
              minLength: {
                value: 5,
                message: t("editNews.contentMinLength"),
              },
            })}
            error={errors.newsData?.message}
          />
          <ImgComponent
            id="image"
            label={t("editNews.uploadImageLabel")}
            maxFileSizeInMB={3}
            register={register}
            error={errors.media?.message}
            defaultImage={newsData?.media}
          />

          <CheckBox
            {...register("special", { required: false })}
            defaultChecked={newsData?.special}
            id="special"
            label={t("editNews.hotTopicsLabel")}
            error={errors.special?.message}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <button
              type="submit"
              className="btn"
              disabled={isPending}
              style={{ backgroundColor: "#534ee8", color: "white" }}
            >
              {isPending ? t("editNews.loading") : t("editNews.submit")}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
