import axios from "axios";

const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/linkbrary/v1",
});

instance.interceptors.request.use(function (config) {
  const currentToken = localStorage.getItem("myAccessToken")!;
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

export default instance;
