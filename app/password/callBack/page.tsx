"use client";
import { ActiveLink, setEmail } from "@/app/_redux/slices/forgetPasswordSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as jwt from "jsonwebtoken";
import { decodeData } from "./utils";

export default function page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("data");

  const dispatch = useDispatch<any>();
  const router = useRouter();
  useEffect(() => {
    const params = {
      data: code,
    };

    if (code)
      dispatch(ActiveLink(params))
        .unwrap()
        .then((response: any) => {
          const data: any = decodeData(code);
          dispatch(setEmail(data.data.email));
          router.push("/password/reset-password");
        })
        .catch((error: any) => {});
  }, []);
  return <div></div>;
}
