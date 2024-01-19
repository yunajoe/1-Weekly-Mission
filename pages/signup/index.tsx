import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import Input from "@/components/input/Input";
import { useForm, FormProvider } from "react-hook-form";
import google from "@/public/images/google.png";
import kakao from "@/public/images/kakao.png";
import { useRouter } from "next/router";
import { FormValues, PASSWORD, FORMVALUEOBJECT } from "@/types/hookFormTypes";
import { SignUp } from "@/api/auth/signup";
import { useMutation } from "react-query";
import { CheckEmail } from "@/api/user/checkEmail";

export default function SingUpPage() {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });

  const [isEyeShow, setIsEyeShow] = useState<boolean>(false);
  const [isReEyeShow, setIsReEyeShow] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<PASSWORD>("password");
  const [repasswordType, setRepasswordType] = useState<PASSWORD>("password");

  const watchEmail = watch<FORMVALUEOBJECT>("email");
  const watchPassword = watch<FORMVALUEOBJECT>("password");
  const watchRePassword = watch<FORMVALUEOBJECT>("repassword");

  const router = useRouter();
  const handlePassWordClick = () => {
    setIsEyeShow(!isEyeShow);
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleRePassWordClick = () => {
    setIsReEyeShow(!isReEyeShow);
    setRepasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignUp) => SignUp(data),
  });
  const onSubmit = async () => {
    if (!watchEmail || !watchPassword || !watchRePassword) {
      alert("빈값이 있으면 안됩니다");
      return;
    }
    try {
      await CheckEmail({
        email: watchEmail,
      });
    } catch (error: any) {
      alert(error.response.data.message);
    }
    signupMutation.mutate(
      {
        email: watchEmail,
        password: watchPassword,
      },
      {
        onSuccess: (data) => {
          reset({
            email: "",
            password: "",
            repassword: "",
          });
          // {accessToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IktLNE05TGFmMXkzWEI0M0…DkifQ.3jx9HxE-5DKaIBop5_y1lnpQdA0Ro43Lf5HvbOi6wWY', refreshToken: '-VgC4J5tMBRREW0twVlVvw'}
          const myAccessToken = data.accessToken;
          const myRefreshToken = data.refreshToken;
          localStorage.setItem("myAccessToken", myAccessToken);
          // localStorage.setItem(
          //   "myRefreshToken",
          //   JSON.stringify(myRefreshToken)
          // );
          router.push("/folder");
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <div className={styles.link__container}>
          <Image src={logo} alt="logo" />
          <div className={styles.link__container__text}>
            <p>이미 회원이신가요?</p>
            <Link href="/signin" className={styles.link__container__link}>
              로그인하기
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
            type={passwordType}
            errors={errors}
            label="password"
            name="password"
            register={register}
            placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요"
            required={{ value: true, message: "비밀번호를 입력해주세요" }}
            pattern={{
              value: /^(?=.*\d)(?=.*[a-zA-Z]).{3,}$/gm,
              message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요",
            }}
            isEyeShow={isEyeShow}
            onClick={handlePassWordClick}
            watchPassword={watchPassword}
          />
          <Input
            type={repasswordType}
            errors={errors}
            label="repassword"
            name="repassword"
            register={register}
            placeholder="비밀번호와 일치하는 값을 입력해 주세요"
            required={{ value: true, message: "비밀번호를 입력해주세요" }}
            isReEyeShow={isReEyeShow}
            onClick={handleRePassWordClick}
            watchRePassword={watchRePassword}
          />
          <button className={styles.login__button} type="submit">
            회원가입
          </button>
          <div className={styles.social__login}>
            <p>다른방식으로 가입하기</p>
            <div className={styles.social__login__images}>
              <Link href="https://www.google.com">
                <Image src={google} alt="google" />
              </Link>
              <Link href="https://www.kakaocorp.com/page">
                <Image
                  src="assets/images.kakao.svg"
                  alt="kakao"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
