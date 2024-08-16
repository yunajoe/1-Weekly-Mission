// https://bootcamp-api.codeit.kr/api/linkbrary/v1/links/451
import instance from "@/utils/interceptors";

export interface putLink {
  linkId: number;
  data: {
    favorite: boolean;
  };
}

export const putLink = async ({ linkId, data }: putLink) => {
  const requestUrl = `/links/${linkId}`;
  const response = await instance.put(requestUrl, data);
  return response.data;
};
