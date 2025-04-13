"use client";
import { ActiveLink, setEmail } from "@/app/_redux/slices/forgetPasswordSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as jwt from "jsonwebtoken";
import { decodeData } from "./utils";
import { downloadDocument } from "../_redux/slices/documentSlice";
import ViewDownloadFile from "../_components/dashboard/requests/ViewDownloadFile";
import { Button, Container, Spinner } from "react-bootstrap";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("data");
  const dispatch = useDispatch<any>();
  const data: any = decodeData(code);
  const [file, setFile] = useState("");
  const startDownload = (dataUrl: string, requestNumber: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `Request_${requestNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const { t } = useTranslation();
  const { loading } = useSelector((state: any) => state.documentSlice);
  useEffect(() => {
    const params = {
      data: code,
    };

    if (code)
      dispatch(downloadDocument({ params }))
        .unwrap()
        .then((response: any) => {
          setFile(response.data.file);
        })
        .catch((error: any) => {});
  }, []);
  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("document.loading")}</span>
        </Spinner>
      </Container>
    );
  }
  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => {
          startDownload(file, "0000");
        }}
        className="d-flex align-items-center gap-2 py-2 px-3 m-3"
      >
        <Download className="w-4 h-4" />
        <span>{t("requests.download")}</span>
      </Button>
      <iframe
        src={file}
        title="Document Preview"
        className="w-100  border-0"
        loading="lazy"
        style={{
          borderRadius: "0 0 0.375rem 0.375rem",
          height: "50vh",
        }}
      />
    </>
  );
}
