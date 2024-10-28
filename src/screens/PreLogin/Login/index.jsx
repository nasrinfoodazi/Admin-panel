import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LoginService } from "../../../services/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { USER_INFO } from "../../../reactQueryProvider/QueryKeys";
import { useAuth } from "../../../hooks/AuthProvider";
import Logo from "../../../components/Logo/Logo.jsx";
import styles from "./index.module.css"
import { enqueueSnackbar } from 'notistack';
const SignInPage = () => {
  const [info, setInfo] = useState(null);

  const queryClient = useQueryClient();

  const { loginAction } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: LoginService,
  });

  const LoginHandler = (data) => {
    mutate(data, {
      onSuccess: (loginData) => {
        queryClient.setQueriesData([USER_INFO], loginData.data);
        loginAction(loginData.data, data);
        enqueueSnackbar('ورود با موفقیت انجام شد .', { variant: 'success' })
      },
      onError: (error) => {
        if (error?.response?.data)

          setInfo({
            data: error?.response?.data,
            status: error?.response?.status,
          });
      },
      onSettled: () => { },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.formWapper}>
        <Logo />
        <h5 >فرم ورود</h5>

        <form onSubmit={handleSubmit(LoginHandler)} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              {...register("username", { required: "پر کردن فیلد اجباری می باشد" })}
              placeholder="نام کاربری"
            />
            <div style={{ color: "red" }}> {errors.username?.message}</div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              {...register("password", {
                required: "پر کردن فیلد اجباری می باشد",
                minLength: {
                  value: 6,
                  message: "تعداد کارکتر مجار نمی باشد.",
                },
              })}
              type="password"
              placeholder="رمز عبور"
            />
            <div style={{ color: "red" }}> {errors.password?.message}</div>
          </div>

          <button type="submit" disabled={isPending} className={styles.btnLog}>
            {isPending ? "منتظر بمانید..." : "ورود"}
          </button>
          <Link to="/signup">
            <button className={styles.register}> ایجاد حساب کاربری !</button>
          </Link>
        </form>
      </div>

      <div style={{ color: info?.status === 201 ? "green" : "red" }}>
        {info?.data?.message}
      </div>


    </div>
  );
};
export default SignInPage;
