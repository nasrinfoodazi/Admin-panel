import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { RegisterService } from "../../../services/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../../components/Logo/Logo.jsx";
import styles from '../Login/index.module.css'

const SignUpPage = () => {
  const [info, setInfo] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: RegisterService,
  });

  const RegisterHandler = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data) setInfo(data);
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
        <h5>فرم ثبت نام</h5>
        <form onSubmit={handleSubmit(RegisterHandler)} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              {...register("username", { required: "پر کردن فیلد اجباری می باشد." })}
              placeholder="نام کاربری"
            />
            <div style={{ color: "red" }}> {errors.username?.message}</div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              {...register("password", {
                required: "پر کردن فیلد اجباری می باشد .",
                minLength: {
                  value: 6,
                  message: "باید شامل حداقل هشت کارکتر باشد",
                },
              })}
              type="password"
              placeholder="رمر عبور"
            />
            <div style={{ color: "red" }}> {errors.password?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="تکرار رمز عبور"
              {...register("confirmPassword", {
                required: "پر کردن فیلد اجباری می باشد .",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "عدم مطابقت با پسورد";
                  }
                },
              })}
            />
            <div style={{ color: "red" }}>
              {errors.confirmPassword?.message}
            </div>
          </div>

          <button type="submit" disabled={isPending} className={styles.btnLog}>
            {isPending ? "شکیبا باشید ....." : "ثبت نام"}
          </button>
          <Link to="/login">
            <button className={styles.register}>حساب کاربری دارید ؟</button>
          </Link>
        </form>
      </div>

      <div style={{ color: info?.status === 201 ? "green" : "red" }}>
        {info?.data?.message}
      </div>


    </div>
  );
};
export default SignUpPage;
