import { toast } from "react-toastify";

const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000, // Duration in milliseconds (3 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default showSuccessToast;
