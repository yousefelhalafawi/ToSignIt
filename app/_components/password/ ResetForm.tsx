"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import TextField from "../common/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RiMailCheckFill } from "react-icons/ri";
import { ForgetPassword } from "@/app/_redux/slices/forgetPasswordSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface FormValues {
  password: string;
}

const ResetForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();
  const { loading, email } = useSelector(
    (state: any) => state.forgetPasswordSlice
  );
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload = {
      email: email,
      password: data.password,
    };
    dispatch(ForgetPassword(payload))
      .unwrap()
      .then(() => {
        router.push("/login");
      })
      .catch(() => {});
  };

  return (
    <Container fluid className="bg-white h-75 sm-w-80 w-50 rounded">
      <Card className="m-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column justify-content-center p-5"
        >
          <TextField
            label={t("resetForm.emailLabel")}
            name="email"
            register={register}
            errors={errors}
            maxLength={50}
            defaultValue={email}
            readOnly={true}
          />
          <TextField
            label={t("resetForm.passwordLabel")}
            name="password"
            register={register}
            errors={errors}
            required={true}
            minLength={8}
            maxLength={15}
            password={true}
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
            customErrorMessage={t("resetForm.passwordCustomError")}
          />

          <Button
            type="submit"
            className="w-50 main-btn m-auto"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              t("resetForm.changePasswordButton")
            )}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ResetForm;
