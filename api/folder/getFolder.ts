import instance from "@/utils/interceptors";

export const getFolders = async () => {
  const requestUrl = "/folders";
  const response = await instance.get(requestUrl);
  return response.data;
};
