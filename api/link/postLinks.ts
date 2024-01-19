import instance from "@/utils/interceptors";
// https://bootcamp-api.codeit.kr/api/linkbrary/v1/links
export interface postLink {
  data: {
    url: string;
    folderId: number;
  };
}

export const postLink = async ({ data }: postLink) => {
  const requestUrl = "/links";
  const response = await instance.post(requestUrl, data);
  return response.data;
};
