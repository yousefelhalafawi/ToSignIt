"use client";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./_style/news.module.scss";
import AppInput from "./../../_components/layout/TextField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import withAuthHOC from "@/app/_Auth/wihAuth";
import showSuccessToast from "@/app/_utils/SuccessMsg";
import { useRouter } from "next/navigation";
import showErrorToast from "@/app/_utils/ErrorMsg";
import CheckBox from "@/app/_components/layout/CheckBox";
import { AppDispatch } from "@/app/_redux/store";
import { Logout, LogoutFunction } from "@/app/_redux/slices/authSlice";
import ImgComponent from "@/app/_components/layout/ImgComponent";
import { useTranslation } from "react-i18next";

type Inputs = {
  title: string;
  content: string;
  image: string;
  special: string;
};

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

function Page() {
  const { token } = useSelector((state: any) => state.authSlice);
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          `${endPoint}/api/news`,
          {
            title: data.title,
            newsData: data.content,
            media: data.image,
            special: data.special,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the Bearer token here
            },
          }
        );

        if (response.data.responseCode === 201) {
          showSuccessToast(response.data.responseMessage);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      } catch (error: any) {
        if (error.response.data.responseCode === 401) {
          showErrorToast(
            `${
              error?.response?.data?.responseMessage
                ? error.response.data.responseMessage
                : t("newsAdmin.errorOccurred")
            }`
          );
          setTimeout(() => {
            dispatch(Logout());
          }, 2000);
        }
      }
    });
  };

  return (
    <section
      className="p-4 d-flex flex-column"
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <div className="mb-5">
        <h2 className={styles.news}>{t("newsAdmin.header")}</h2>
      </div>

      <section className="flex-grow-1 d-flex">
        <form
          className="d-flex justify-content-between flex-column flex-grow-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <AppInput
              label={t("newsAdmin.titleLabel")}
              type="text"
              placeholder={t("newsAdmin.titlePlaceholder")}
              {...register("title", {
                required: t("newsAdmin.titleRequired"),
                minLength: {
                  value: 5,
                  message: t("newsAdmin.titleMinLength"),
                },
                maxLength: {
                  value: 100,
                  message: t("newsAdmin.titleMaxLength"),
                },
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/,
                  message: t("newsAdmin.titlePattern"),
                },
              })}
              error={errors.title?.message}
            />

            <AppInput
              label={t("newsAdmin.descriptionLabel")}
              as="textarea"
              placeholder={t("newsAdmin.descriptionPlaceholder")}
              {...register("content", {
                required: t("newsAdmin.contentRequired"),
                minLength: {
                  value: 20,
                  message: t("newsAdmin.contentMinLength"),
                },
                maxLength: {
                  value: 500,
                  message: t("newsAdmin.contentMaxLength"),
                },
              })}
              error={errors.content?.message}
            />

            <ImgComponent
              id="image"
              label={t("newsAdmin.uploadImageLabel")}
              maxFileSizeInMB={3}
              register={register}
              error={errors.image?.message}
            />

            <CheckBox
              {...register("special", { required: false })}
              id="special"
              label={t("newsAdmin.hotTopicsLabel")}
              error={errors.special?.message}
            />
          </div>
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
              style={{
                backgroundColor: "#534ee8",
                color: "white",
              }}
              disabled={isPending}
            >
              {isPending ? t("newsAdmin.loading") : t("newsAdmin.submitButton")}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default withAuthHOC(Page, ["Admin"]);
