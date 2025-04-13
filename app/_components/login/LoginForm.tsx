"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, Spinner } from "react-bootstrap";
import TextField from "../common/TextField";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "@/app/_redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface FormValues {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { loading } = useSelector((state: any) => state.authSlice);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(Login(data))
      .unwrap()
      .then((response: any) => {
        router.push("/");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card className="bg-white rounded m-3 border-gray login-width">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column justify-content-between p-2 mt-1"
        >
          <div className="m-2">
            <TextField
              label={t("login.emailLabel")}
              name="email"
              register={register}
              errors={errors}
              required={true}
              maxLength={50}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
          </div>
          <div className="m-2">
            <TextField
              label={t("login.passwordLabel")}
              name="password"
              register={register}
              errors={errors}
              required={true}
              minLength={8}
              maxLength={15}
              password={true}
            />
          </div>
          <Link
            href="/password/forget-password"
            className="main-color align-self-end mb-2 me-2"
          >
            {t("login.forgetPassword")}
          </Link>
          <Button
            type="submit"
            className="w-50 main-btn m-auto mt-5"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              t("login.submitButton")
            )}
          </Button>
        </form>
        <div className="d-flex justify-content-center">
          <p className="mt-4">
            {t("login.noAccount")}
            <Link href="/register" className="main-color align-self-end ms-1">
              {t("login.register")}
            </Link>
          </p>
        </div>
      </Card>
    </>
  );
};

export default LoginComponent;
