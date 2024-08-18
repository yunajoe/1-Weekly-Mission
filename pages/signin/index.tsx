import Input from "@/components/input/Input";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.css";

import { SignIn } from "@/api/auth/signin";
import { FormValues } from "@/types/hookFormTypes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
export default function SingInPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [type, setType] = useState<string>("password");

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const router = useRouter();
  const handleClick = () => {
    setIsEyeShow(!isEyeShow);
    setType((prev) => (prev === "password" ? "text" : "password"));
  };
  const signinMutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: (data: SignIn) => SignIn(data),
  });

  const onSubmit = () => {
    if (!watchEmail || !watchPassword) {
      alert("빈값이 있으면 안됩니다");
      return;
    }
    signinMutation.mutate(
      {
        email: watchEmail,
        password: watchPassword,
      },
      {
        onSuccess: (data) => {
          const myAccessToken = data.accessToken;
          const myRefreshToken = data.refreshToken;
          if (myAccessToken) {
            localStorage.setItem("myAccessToken", myAccessToken);
            localStorage.setItem("myRefreshToken", myRefreshToken);
            router.push("/folder");
          }
        },
        onError: (err) => {
          alert("회원이 아닙니다. 회원가입을 해주세요");
          reset({
            email: "",
            password: "",
            repassword: "",
          });
          return;
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.link__container}>
        <Image src={logo} alt="logo" />
        <div className={styles.link__container__text}>
          <p>회원이 아니신가요?</p>
          <Link href="/signup" className={styles.link__container__link}>
            회원가입하기
          </Link>
        </div>
      </div>
      <form
        className={styles.form__container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          errors={errors}
          label="email"
          name="email"
          register={register}
          placeholder="이메일을 입력해 주세요"
          required={{ value: true, message: "이메일을 입력해 주세요" }}
          minLength={{ value: 3, message: "최소 3글자를 입력해주세요" }}
          pattern={{
            value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/gm,
            message: "유효한 이메일이 아닙니다",
          }}
        />
        <Input
          type={type}
          errors={errors}
          label="password"
          name="password"
          register={register}
          placeholder="비밀번호를 입력해 주세요"
          required={{ value: true, message: "비밀번호를 입력해주세요" }}
          onClick={handleClick}
          isEyeShow={isEyeShow}
        />
        <button className={styles.login__button}>로그인</button>
        <div className={styles.social__login}>
          <p>소설로그인</p>
          <div className={styles.social__login__images}>
            <Link href="https://www.google.com">
              <Image
                src="/images/google-oauth.png"
                alt="google"
                width={40}
                height={40}
              />
            </Link>
            <Link href="https://www.kakao.com">
              <Image
                src="/images/kakao-oauth.png"
                alt="kakao"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
