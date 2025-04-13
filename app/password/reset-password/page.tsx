"use client";
import ResetForm from "@/app/_components/password/ ResetForm";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { email } = useSelector((state: any) => state.forgetPasswordSlice);

  return (
    <div>
      <ResetForm />
    </div>
  );
}
