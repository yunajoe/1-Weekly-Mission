//https://bootcamp-api.codeit.kr/api/linkbrary/v1/users
import instance from "@/utils/interceptors";

export const getUser = async () => {
  const requestUrl = "/users";
  const response = await instance.get(requestUrl);
  return response.data;
};
