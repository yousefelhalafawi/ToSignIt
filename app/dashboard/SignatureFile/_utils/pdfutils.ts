//signing/sign-basic/

import { Logout } from "@/app/_redux/slices/authSlice";
import showErrorToast from "@/app/_utils/ErrorMsg";
import showSuccessToast from "@/app/_utils/SuccessMsg";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

export const sentPdf = async ({ token, id }: { token: string; id: any }) => {
  try {
    const response = await axios.post(
      `${endPoint}/api/signing/sign-basic/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      }
    );
    return response.data;
  } catch (error: any) {
    showErrorToast(
      `${
        error?.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : "An error has occurred"
      }`
    );

    throw Error("An error has occured");
  }
};

export const getContact = async ({
  token,
  email,
  language,
  dispatch,
}: {
  token: string;
  email: string;
  language: string;
  dispatch: any;
}) => {
  try {
    const response = await axios.get(
      `${endPoint}/api/user/search?email=${email}&lang=${language}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      }
    );
    return response.data.data.user;
  } catch (error: any) {
    showErrorToast(
      `${
        error?.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : "An error has occurred"
      }`
    );
    if (error.response.data.responseCode === 401) {
      setTimeout(() => {
        dispatch(Logout());
      }, 2000);
    }

    throw Error("An error has occured");
  }
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const handleSubmit = async ({
  pdfDoc,
  signaturePositions,
  mySignaturePosition,
  token,
  router,
  dispatch,
  signatureType,
  otpMethod,
}: {
  pdfDoc: any;
  signaturePositions: any[];
  mySignaturePosition: any;
  token: string;
  router: any;
  dispatch: any;
  otpMethod?: string;
  signatureType: "basic" | "otp";
}) => {
  if (!pdfDoc) return;

  const isEmail: boolean = otpMethod === "email";

  try {
    // Convert the PDF to base64
    // const pdfArrayBuffer = await pdfDoc.getData();
    // const pdfBase64 = arrayBufferToBase64(pdfArrayBuffer);

    // Dynamically assign signature positions to user keys
    const signatures: Record<string, any> = {};

    // Add mySignaturePosition as userOne if it exists
    if (mySignaturePosition) {
      signatures.userOne = mySignaturePosition;
    }

    // Assign signaturePositions to userTwo, userThree, etc.
    signaturePositions.forEach((signature, index) => {
      const userKey = `user${numberToWords(index + 2)}`; // userTwo, userThree, etc.
      signatures[userKey] = signature;
    });

    // Prepare the data to be submitted
    const submissionData = {
      pdf: pdfDoc,
      ...signatures,
    };

    if (Object.keys(signatures).length === 0!) {
      showErrorToast("Please add Signatures First");
      return;
    }
    // Choose API endpoint based on signature type
    const apiEndpoint =
      signatureType === "otp"
        ? `${endPoint}/api/signing/sign-otp/`
        : `${endPoint}/api/signing/sign-basic/`;

    const response = await axios.post(
      `${apiEndpoint} `,
      {
        ...submissionData,
        ...(signatureType === "otp" ? {} : {}),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      }
    );
    showSuccessToast(`${response.data.responseMessage}`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
    if (response.data) return response.data.data.user;
  } catch (error: any) {
    showErrorToast(`${error.response.data.responseMessage}`);
    if (error.response.data.responseCode === 401) {
      setTimeout(() => {
        dispatch(Logout());
      }, 2000);
    }
  }
};

// Helper function to convert numbers to words
const numberToWords = (num: number): string => {
  const words = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];
  return words[num - 1] || num.toString(); // Fallback to number if out of range
};
