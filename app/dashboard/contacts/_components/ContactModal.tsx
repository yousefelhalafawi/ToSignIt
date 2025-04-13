"use client";
import AppInput from "@/app/_components/layout/TextField";
import { LogoutFunction } from "@/app/_redux/slices/authSlice";
import { AppDispatch } from "@/app/_redux/store";
import showErrorToast from "@/app/_utils/ErrorMsg";
import showSuccessToast from "@/app/_utils/SuccessMsg";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useTranslation } from "react-i18next";
import styles from "../_style/contacts.module.scss";

type Inputs = {
  contactUserName: string;
  contactEmail: string;
  contactPhoneNumber: string;
};
const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ContactModal({
  showNewContactModal,
  setShowNewContactModal,
  setRefetch,
  token,
}: any) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      contactUserName: "",
      contactEmail: "",
      contactPhoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          `${endPoint}/api/contacts/`,
          {
            contactEmail: data.contactEmail,
            contactUserName: data.contactUserName,
            contactPhoneNumber: data.contactPhoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.responseCode === 201) {
          showSuccessToast(response.data.responseMessage);
          setShowNewContactModal(false);
          setRefetch((prev: boolean) => !prev);
          setTimeout(() => {
            router.push("/dashboard/contacts");
          }, 2000);
        }
      } catch (error: any) {
        showErrorToast(
          `${
            error?.response?.data?.responseMessage
              ? error.response.data.responseMessage
              : t("contactModal.errorOccurred")
          }`
        );
        if (error.response.data.responseCode === 401) {
          setTimeout(() => {
            dispatch(LogoutFunction());
          }, 2000);
        }
      }
    });
  };

  useEffect(() => {
    if (!showNewContactModal) {
      reset();
    }
  }, [showNewContactModal, reset]);

  return (
    <div
      className={`modal fade ${showNewContactModal ? "show" : ""}`}
      style={{ display: showNewContactModal ? "block" : "none" }}
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t("contactModal.addNewContact")}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowNewContactModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <AppInput
                  label={t("contactModal.userName")}
                  type="text"
                  placeholder={t("contactModal.enterUserName")}
                  {...register("contactUserName", {
                    required: t("contactModal.nameRequired"),
                    minLength: {
                      value: 5,
                      message: t("contactModal.nameMinLength"),
                    },
                    maxLength: {
                      value: 20,
                      message: t("contactModal.nameMaxLength"),
                    },
                    pattern: {
                      value: /^[A-Za-z0-9\s]+$/,
                      message: t("contactModal.namePattern"),
                    },
                  })}
                  error={errors.contactUserName?.message}
                />

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    {t("contactModal.phoneNumber")}
                  </label>
                  <Controller
                    control={control}
                    name="contactPhoneNumber"
                    rules={{
                      required: t("contactModal.phoneRequired"),
                      validate: (value: string) => {
                        const digits = value.replace(/\D/g, "");
                        return (
                          digits.length > 2 || t("contactModal.phoneRequired")
                        );
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      // Create your own ref that PhoneInput expects
                      const phoneInputRef =
                        React.useRef<HTMLInputElement>(null);
                      // Forward the current value to react-hook-form via the ref callback
                      React.useEffect(() => {
                        if (typeof ref === "function") {
                          ref(phoneInputRef.current);
                        }
                      }, [ref]);
                      return (
                        <>
                          <PhoneInput
                            style={{ width: "100%" }}
                            defaultCountry="fr"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputRef={phoneInputRef}
                          />
                          {errors.contactPhoneNumber && (
                            <div className="text-danger">
                              {errors.contactPhoneNumber.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </div>

                <AppInput
                  label={t("contactModal.userEmail")}
                  type="text"
                  placeholder={t("contactModal.enterUserEmail")}
                  {...register("contactEmail", {
                    required: t("contactModal.emailRequired"),
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: t("contactModal.emailPattern"),
                    },
                  })}
                  error={errors.contactEmail?.message}
                />
              </div>
              <button
                type="submit"
                className={`${styles["button-6"]}`}
                style={{ display: "flex", justifySelf: "end" }}
              >
                {t("contactModal.addContact")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
