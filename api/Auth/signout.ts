import instance from "@/utils/interceptors";

export interface SignOut {
  email: string;
  password: string;
}

export const SignOut = async (data: SignOut) => {
  const requestUrl = "/auth/sign-out";
  const response = await instance.post(requestUrl, data);
  return response.data;
};
