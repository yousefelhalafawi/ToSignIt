"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import TextField from "../common/TextField";
import PhoneNumber from "../common/PhoneNumber";
import { errorToast, successToast } from "../common/alert/AlertTimer";
import { useDispatch } from "react-redux";
import { sendContactRequest } from "@/app/_redux/slices/contact";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  content: string;
};

export default function ContactForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(sendContactRequest({ data: data }))
      .unwrap()
      .then(() => {
        reset();
        successToast(t("contact.success"));
      })
      .catch((error: any) => {
        errorToast(t("contact.error"));
      });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{t("contact.title")}</h3>
              <p className="card-subtitle text-muted">
                {t("contact.subtitle")}
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Col>
                    <TextField
                      label={t("contact.name")}
                      name="fullName"
                      register={register}
                      errors={errors}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <TextField
                      label={t("contact.email")}
                      name="email"
                      register={register}
                      errors={errors}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <PhoneNumber
                      element={{
                        label: t("contact.phone"),
                        name: "phoneNumber",
                        placeholder: t("contact.phonePlaceholder"),
                        required: true,
                      }}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="content" className="form-label">
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="content"
                      className="form-control"
                      rows={5}
                      placeholder={t("contact.messagePlaceholder")}
                      {...register("content", {
                        required: t("contact.messageRequired"),
                      })}
                    ></textarea>
                    {errors.content && (
                      <span className="text-danger">
                        {errors.content.message}
                      </span>
                    )}
                  </Col>
                </Row>

                <Row className="text-center">
                  <Col>
                    <Button
                      type="submit"
                      className="w-50 primary-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          {t("contact.sending")}
                        </>
                      ) : (
                        t("contact.send")
                      )}
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
