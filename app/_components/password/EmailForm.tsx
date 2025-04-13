"use client";
import React, { useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import TextField from "../common/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RiMailCheckFill } from "react-icons/ri";
import { ResetPassword } from "@/app/_redux/slices/forgetPasswordSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: any) => state.forgetPasswordSlice);
  const [mode, setMode] = useState(true);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(ResetPassword(data))
      .unwrap()
      .then(() => {
        setMode(false);
      })
      .catch(() => {});
  };

  return (
    <Container fluid className="bg-white sm-w-80 w-50 rounded p-5">
      <Card className="m-5">
        {mode ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column justify-content-center p-5"
          >
            <TextField
              label={t("forgetPassword.emailLabel")}
              name="email"
              register={register}
              errors={errors}
              required={true}
              maxLength={50}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            <Button
              type="submit"
              className="w-50 main-btn m-auto"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                t("forgetPassword.resetButton")
              )}
            </Button>
          </form>
        ) : (
          <div
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ height: "50vh" }}
          >
            <div>
              <RiMailCheckFill size={150} className="main-color" />
            </div>
            <h3>{t("forgetPassword.successHeader")}</h3>
            <span className="p-2">{t("forgetPassword.instructions1")}</span>
            <span className="p-2">{t("forgetPassword.instructions2")}</span>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ForgetPassword;
