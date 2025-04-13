"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Container, Spinner } from "react-bootstrap";
import TextField from "../common/TextField";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CompanyRegister, Register } from "@/app/_redux/slices/authSlice";
import PhoneNumber from "../common/PhoneNumber";
import ToggleButton from "./ToogleButton";
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
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
  const [isToggled, setIsToggled] = useState(true);

  const onSubmit: SubmitHandler<any> = (data) => {
    dispatch(Register(data))
      .unwrap()
      .then((response: any) => {
        router.push("/login");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const CompanySubmit: SubmitHandler<any> = (data) => {
    dispatch(CompanyRegister(data))
      .unwrap()
      .then((response: any) => {
        router.push("/login");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Container className="bg-white h-100 max-width-100 p-3">
      <div className="d-flex justify-content-between mt-3">
        <div className="p-3 fw-bold"></div>
        <ToggleButton isToggled={isToggled} setIsToggled={setIsToggled} />
      </div>
      {/* User Form */}
      {isToggled && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column justify-content-center p-4 h-100"
        >
          <div className="row">
            <div className="col-md-6">
              <TextField
                label={t("registerForm.firstName")}
                name="firstName"
                register={register}
                errors={errors}
                required={true}
                minLength={3}
                maxLength={10}
                pattern="^[a-zA-Z0-9\\s]{3,10}$"
              />
            </div>
            <div className="col-md-6">
              <TextField
                label={t("registerForm.lastName")}
                name="lastName"
                register={register}
                errors={errors}
                required={true}
                minLength={3}
                maxLength={10}
                pattern="^[a-zA-Z0-9\\s]{3,10}$"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <TextField
                label={t("registerForm.email")}
                name="email"
                register={register}
                errors={errors}
                required={true}
                maxLength={100}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                label={t("registerForm.jobTitle")}
                name="jobTitle"
                register={register}
                errors={errors}
                required={true}
                maxLength={50}
              />
            </div>
            <div className="col-md-6">
              <PhoneNumber
                element={{
                  label: t("registerForm.phoneNumber"),
                  name: "phoneNumber",
                  required: true,
                }}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TextField
                label={t("registerForm.password")}
                name="password"
                register={register}
                minLength={8}
                maxLength={20}
                errors={errors}
                required={true}
                password={true}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
                customErrorMessage={t("registerForm.passwordCustomError")}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 text-center">
              <Button type="submit" className="w-50 main-btn">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("registerForm.submit")
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
      {/* Company Form */}
      {!isToggled && (
        <form
          onSubmit={handleSubmit(CompanySubmit)}
          className="d-flex flex-column justify-content-center p-4 h-100"
        >
          <div className="row">
            <div className="col-md-6">
              <TextField
                label={t("registerForm.firstName")}
                name="firstName"
                register={register}
                errors={errors}
                required={true}
                minLength={3}
                maxLength={10}
                pattern="^[a-zA-Z0-9\\s]{3,10}$"
              />
            </div>
            <div className="col-md-6">
              <TextField
                label={t("registerForm.lastName")}
                name="lastName"
                register={register}
                errors={errors}
                required={true}
                minLength={3}
                maxLength={10}
                pattern="^[a-zA-Z0-9\\s]{3,10}$"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <TextField
                label={t("registerForm.email")}
                name="email"
                register={register}
                errors={errors}
                required={true}
                maxLength={100}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              />
            </div>
            <div className="col-md-6">
              <TextField
                label={t("registerForm.companyName")}
                name="companyName"
                register={register}
                errors={errors}
                required={true}
                maxLength={50}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                label={t("registerForm.jobTitle")}
                name="jobTitle"
                register={register}
                errors={errors}
                required={true}
                maxLength={50}
              />
            </div>
            <div className="col-md-6">
              <PhoneNumber
                element={{
                  label: t("registerForm.phoneNumber"),
                  name: "phoneNumber",
                  required: true,
                }}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                label={t("registerForm.companyEmail")}
                name="companyEmail"
                register={register}
                maxLength={100}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                errors={errors}
                required={true}
              />
            </div>
            <div className="col-md-6">
              <PhoneNumber
                element={{
                  label: t("registerForm.companyNumber"),
                  name: "companyPhoneNumber",
                  required: true,
                }}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TextField
                label={t("registerForm.password")}
                name="password"
                register={register}
                minLength={8}
                maxLength={20}
                errors={errors}
                required={true}
                password={true}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
                customErrorMessage={t("registerForm.passwordCustomError")}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 text-center">
              <Button type="submit" className="w-50 main-btn">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("registerForm.submit")
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
      <div className="d-flex justify-content-center">
        <p className="mt-4">
          {t("registerForm.alreadyHaveAccount")}
          <Link
            href="/login"
            className="darkBlue-color-color align-self-end ms-1"
          >
            {t("registerForm.loginLink")}
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default RegisterForm;
