import instance from "@/utils/interceptors";

export const deleteFolder = async (folderId: number) => {
  const requestUrl = `/folders/${folderId}`;
  const response = await instance.delete(requestUrl);
  return response.data;
};
