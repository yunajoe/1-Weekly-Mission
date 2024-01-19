import instance from "@/utils/interceptors";

export interface SignUp {
  email: string;
  password: string;
}

export const SignUp = async (data: SignUp) => {
  const requestUrl = "/auth/sign-up";
  const response = await instance.post(requestUrl, data);
  return response.data;
};
