import showErrorToast from "@/app/_utils/ErrorMsg";
import axios from "axios";
const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchNewsById = async ({
  token,
  id,
}: {
  token: string;
  id: any;
}) => {
  try {
    const response = await axios.get(`${endPoint}/api/news/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token here
      },
    });

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
