import showErrorToast from "@/app/_utils/ErrorMsg";
import axios from "axios";
const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchContacts = async ({
  token,
  limit,
  page,
}: {
  token: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await axios.get(
      `${endPoint}/api/contacts/?limit=${limit}&page=${page}`,
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

export const deleteContact = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const response = await axios.delete(`${endPoint}/api/contacts/${id}`, {
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
