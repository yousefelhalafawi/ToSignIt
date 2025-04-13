import {
  errorToast,
  successToast,
} from "@/app/_components/common/alert/AlertTimer";
import { setUserSignature } from "@/app/_redux/slices/authSlice";
import axios from "axios";

export const colorOptions = [
  { value: "#000000", label: "Black" },
  { value: "#0000FF", label: "Blue" },
  { value: "#FF0000", label: "Red" },
  { value: "#006400", label: "Dark Green" },
];

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

interface SaveSignatureParams {
  token: string;
  router: any;
  payload: Record<string, any>;
  dispatch?: any;
}

export const SaveSignature = async ({
  token,
  router,
  payload,
  dispatch,
}: SaveSignatureParams) => {
  try {
    const response = await axios.post(
      `${endPoint}/api/digital-signature`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // If needed
        },
      }
    );

    if (response.status === 200) {
      successToast(
        response.data.responseMessage ||
          "Signature has been successfully created."
      );

      dispatch(setUserSignature(response.data.data.digitalSignature));

      // Navigate to the dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.responseMessage || "An unexpected error occurred.";
    errorToast(errorMessage);
  }
};
