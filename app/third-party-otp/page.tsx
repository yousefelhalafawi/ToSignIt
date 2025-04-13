"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OtpVerification from "./OtpVerification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { decodeData } from "../password/callBack/utils";
import { SendOTP } from "../_redux/slices/signingSlice";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("data");
  const dispatch = useDispatch<any>();
  const data: any = decodeData(code);

  useEffect(() => {
    if (code && data.valid) {
      const endPoint = `${data.data.requestNumber}/${data.data.userPhoneNumber}/${data.data.email}`;
      dispatch(SendOTP({ endpoint: endPoint }))
        .unwrap()
        .then((response: any) => {})
        .catch((error: any) => {});
    } else {
      router.push("/");
    }
  }, []);
  return (
    <>
      <OtpVerification requestId={data?.data?.requestId} data={data?.data} />
    </>
  );
}
