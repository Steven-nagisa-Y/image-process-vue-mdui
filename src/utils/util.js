import axios from "axios";
import { Config } from "@/config/config";

export async function Upload(func, file, id) {
  let { data } = await Config();
  const url = data.Url + func;
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
