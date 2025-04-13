"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  EditProfileFunction,
  LogoutFunction,
} from "@/app/_redux/slices/authSlice";
import TextField from "../../common/TextField";
import PhoneNumber from "../../common/PhoneNumber";
import { useTranslation } from "react-i18next";

function getChangedKeysWithNewValues(obj1: any, obj2: any) {
  const changes: any = {};
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        changes[key] = obj1[key];
      }
    }
  }
  return changes;
}

const EditProfile = ({ setMode }: any) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { loading, profileData } = useSelector((state: any) => state.authSlice);

  const onSubmit: SubmitHandler<any> = (data) => {
    const patchedData = getChangedKeysWithNewValues(data, profileData);
    if (Object.keys(patchedData).length > 0) {
      dispatch(EditProfileFunction(patchedData))
        .unwrap()
        .then(() => {
          setMode(true);
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    } else {
      console.log(t("editProfile.noChanges"));
    }
  };

  return (
    <Container className="p-4 bg-white rounded shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={6}>
            <TextField
              label={t("editProfile.firstName")}
              name="firstName"
              register={register}
              errors={errors}
              required
              minLength={3}
              maxLength={50}
              defaultValue={profileData.firstName}
            />
          </Col>
          <Col md={6}>
            <TextField
              label={t("editProfile.lastName")}
              name="lastName"
              register={register}
              errors={errors}
              required
              minLength={3}
              defaultValue={profileData.lastName}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <TextField
              label={t("editProfile.email")}
              name="email"
              register={register}
              errors={errors}
              required
              defaultValue={profileData.email}
            />
          </Col>
          <Col md={6}>
            <PhoneNumber
              element={{
                label: t("editProfile.phoneNumber"),
                name: "phoneNumber",
                required: true,
              }}
              defaultValue={profileData.phoneNumber}
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <TextField
              label={t("editProfile.jobTitle")}
              name="jobTitle"
              register={register}
              defaultValue={profileData.jobTitle}
              errors={errors}
              required
              maxLength={50}
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
                t("editProfile.editButton")
              )}
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default EditProfile;
