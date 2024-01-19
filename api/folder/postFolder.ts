import instance from "@/utils/interceptors";

export interface postFolder {
  data: { name: string };
}

export const postFolder = async ({ data }: postFolder) => {
  const requestUrl = "/folders";
  const response = await instance.post(requestUrl, data);
  return response.data;
};
