//bootcamp-api.codeit.kr/api/linkbrary/v1/links
import instance from "@/utils/interceptors";

export type getLinksType = getLinks[];

export interface getLinks {
  id: number;
  favorite: boolean;
  created_at: string;
  url: string;
  title: string;
  image_source?: string;
  description: string;
}

export const getLinks = async () => {
  const requestUrl = "/links";
  const response = await instance.get(requestUrl);
  return response.data;
};
