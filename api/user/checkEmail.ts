// https://bootcamp-api.codeit.kr/api/linkbrary/v1/users/check-email
import instance from "@/utils/interceptors";

export interface CheckEmail {
  email: string;
}

export const CheckEmail = async (data: CheckEmail) => {
  const requestUrl = "/users/check-email";
  const response = await instance.post(requestUrl, data);
  return response.data;
};
