import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/product";
import { PL_PRODUCT_LIST } from "../../reactQueryProvider/QueryKeys";
import { useForm } from "react-hook-form";
import "../../styles/index.css";
import style from "./modal.module.css";
import { enqueueSnackbar } from "notistack";

function AddProduct({ onSuccess, dialogRef }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  //update/create
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
  });
  const onCreate = (data) => {
    mutate(
      {
        name: data.name,
        price: data.price || 0,
        quantity: data.quantity || 0,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [PL_PRODUCT_LIST] });
          dialogRef?.current?.close();
          enqueueSnackbar('افزودن کالا با موفقیت انجام شد', { variant: 'success' })
          setTimeout(() => {
            onSuccess();
          }, 700);
        },
        onError: () => { },
        onSettled: () => { },
      }
    );
  };

  return (
    (!isPending && (
      <div className={style.container}>
        <h3>ایجاد محصول جدید</h3>
        <form onSubmit={handleSubmit(onCreate)} className={style.form}>
          <div className={style.inputSec}>
            <label htmlFor="name">نام کالا</label>
            <input
              id="name"
              {...register("name", {
                required: "پر کردن این فیلد اجباری است .",
              })}
              placeholder="نام کالا"
            />
            <div style={{ color: "red" }}> {errors.name?.message}</div>
          </div>
          <div className={style.inputSec}>
            <label htmlFor="price">قیمت</label>
            <input
              id="price"
              type="number"
              {...register("price", {
                required: "پر کردن این فیلد اجباری است .",
              })}
              placeholder="قیمت"
            />
          </div>
          <div className={style.inputSec}>
            <label htmlFor="quantity">تعداد کالا</label>
            <input
              id="quantity"
              type="number"
              {...register("quantity", {
                required: "پر کردن این فیلد اجباری است .",
              })}
              placeholder="تعداد"
            />
          </div>
          <div className={style.submit}>
            <button type="submit" disabled={isPending}>
              {isPending ? "منتظر بمانید...." : "ایجاد"}
            </button>
            <button
              onClick={() => {
                dialogRef?.current?.close();
                setTimeout(() => {
                  onSuccess();
                }, 700);
              }}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    )) ||
    "loading..."
  );
}

export default AddProduct;
