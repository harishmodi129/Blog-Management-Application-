import toast from "react-hot-toast";
export const ToastHandler = (type, message) => {
  if (type === "success") toast.success(message);
  else if (type === "error") toast.error(message);
};
