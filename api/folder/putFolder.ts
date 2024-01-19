// https://bootcamp-api.codeit.kr/api/linkbrary/v1/folders/400
import instance from "@/utils/interceptors";

export interface putFolder {
  folderId: number;
  data: { name: string };
}

export const putFolder = async ({ folderId, data }: putFolder) => {
  const requestUrl = `/folders/${folderId}`;
  const response = await instance.put(requestUrl, data);
  return response.data;
};
