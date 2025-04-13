"use client";

import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../common/TextField";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { EditCompanyData } from "@/app/_redux/slices/companySlice";
import PaginatedTable from "./PaginatedTable";
import { useTranslation } from "react-i18next";

const CompanyProfile: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();

  const { loading, companyData } = useSelector(
    (state: any) => state.companySlice
  );

  const onSubmit: SubmitHandler<any> = (data) => {
    if (Object.keys(data).length > 0) {
      dispatch(EditCompanyData(data))
        .unwrap()
        .then(() => {})
        .catch((error: any) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No changes detected");
    }
  };
  const buttonDisabled =
    loading || watch("companyName")
      ? watch("companyName") === companyData.companyName
      : false;

  return (
    <>
      <Container className="p-4 bg-white rounded shadow-sm">
        {Object.keys(companyData).length > 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3 ">
              <Col md={11}>
                <TextField
                  label={t("companyProfile.companyName")}
                  name="companyName"
                  register={register}
                  errors={errors}
                  required
                  minLength={3}
                  maxLength={50}
                  defaultValue={companyData.companyName}
                />
              </Col>
              <Col md={1} className=" align-self-end">
                <Button
                  type="submit"
                  disabled={buttonDisabled}
                  className="main-btn mb-1 "
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FaEdit />
                  )}
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Container>

      <Container className="p-4 bg-white rounded shadow-sm">
        {Object.keys(companyData).length > 1 && (
          <PaginatedTable users={companyData.users} />
        )}
      </Container>
    </>
  );
};

export default CompanyProfile;
