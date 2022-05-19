import axios from "axios";
import { Url } from "@/config/config";

export function Upload(func, file, id) {
  const url = Url + func;
  const formData = new FormData();
  formData.append("file", file);
  if (id) formData.append("id", id);
  return axios({
    method: "POST",
    url: url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
