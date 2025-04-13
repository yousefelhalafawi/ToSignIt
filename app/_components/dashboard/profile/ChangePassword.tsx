"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ChangePasswordFunction,
  Logout,
  LogoutFunction,
} from "@/app/_redux/slices/authSlice";
import TextField from "../../common/TextField";
import { useTranslation } from "react-i18next";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { loading } = useSelector((state: any) => state.authSlice);

  const onSubmit: SubmitHandler<any> = (data) => {
    dispatch(ChangePasswordFunction(data))
      .unwrap()
      .then(() => {
        dispatch(Logout());
        router.push("/");
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="p-4 bg-white rounded shadow-sm w-75">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={12}>
            <TextField
              label={t("changePassword.oldPassword")}
              name="oldPassword"
              register={register}
              errors={errors}
              required
              maxLength={50}
              password={true}
            />
          </Col>
          <Col md={12}>
            <TextField
              label={t("changePassword.newPassword")}
              name="newPassword"
              register={register}
              errors={errors}
              required
              minLength={8}
              maxLength={20}
              password={true}
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
              customErrorMessage={t("changePassword.passwordError")}
            />
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <Button
              type="submit"
              disabled={loading}
              className="w-50 primary-button"
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                t("changePassword.submitButton")
              )}
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default ChangePassword;
