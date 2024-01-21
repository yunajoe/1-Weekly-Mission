// https://bootcamp-api.codeit.kr/api/linkbrary/v1/links/481

import instance from "@/utils/interceptors";

export const deleteLink = async (linkId: number) => {
  const requestUrl = `/links/${linkId}`;
  const response = await instance.delete(requestUrl);
  return response.data;
};
