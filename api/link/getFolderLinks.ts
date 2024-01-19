import instance from "@/utils/interceptors";
//bootcamp-api.codeit.kr/api/linkbrary/v1/folders/421/links

export const getFolderLinks = async (folderId: string) => {
  const requestUrl = `/folders/${folderId}/links`;
  const response = await instance.get(requestUrl);
  return response.data;
};
