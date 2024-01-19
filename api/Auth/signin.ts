import instance from "@/utils/interceptors";

export interface SignIn {
  email: string;
  password: string;
}

export const SignIn = async (data: SignIn) => {
  const requestUrl = "/auth/sign-in";
  const response = await instance.post(requestUrl, data);
  return response.data;
};
