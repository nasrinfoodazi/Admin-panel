import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getItem, updateProduct } from "../../services/product";
import {
  PL_PRODUCT_LIST,
  PL_PRODUCT_RECORD,
} from "../../reactQueryProvider/QueryKeys";
import { useForm } from "react-hook-form";
import style from "./modal.module.css";
import { enqueueSnackbar } from "notistack";

function EditProduct({ productId, onSuccess, dialogRef }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = useQuery({
    queryKey: [PL_PRODUCT_RECORD, productId],
    queryFn: () => getItem(productId),
  });

  const queryClient = useQueryClient();
  //update/create
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateProduct(productId, data),
  });
  const onUpdate = (formData) => {
    if (formData.name === data?.data?.name && formData.price === data?.data?.price && formData.quantity === data?.data?.quantity) {
      dialogRef?.current?.close();
      setTimeout(() => {
        onSuccess();
      }, 700);
      return
    }
    mutate(
      {
        name: formData.name,
        price: formData.price || 0,
        quantity: formData.quantity || 0,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [PL_PRODUCT_LIST] });
          dialogRef?.current?.close();
          enqueueSnackbar('تغییرات با موفقیت انجام شد .', { variant: 'success' })
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
    (!isLoading && (
      <div className={style.container}>
        <h3>ویرایش اطلاعات</h3>
        <form onSubmit={handleSubmit(onUpdate)} className={style.form}>
          <div className={style.inputSec}>
            <label htmlFor="name">نام کالا</label>
            <input
              id="name"
              defaultValue={data?.data?.name}
              {...register("name", {
                required: "پر کردن این فیلد اجباری است .",
              })}
              placeholder="تیشرت"
            />
            <div style={{ color: "red" }}> {errors?.name?.message}</div>
          </div>
          <div className={style.inputSec}>
            <label htmlFor="price"></label>
            <input
              id="price"
              defaultValue={data?.data?.price}
              type="number"
              {...register("price", {})}
              placeholder="20 نومان"
            />
            {/* <div style={{ color: "red" }}> {errors.price?.message}</div> */}
          </div>
          <div className={style.inputSec}>
            <label htmlFor="quantity">تعداد کالا</label>
            <input
              id="quantity"
              defaultValue={data?.data?.quantity}
              type="number"
              {...register("quantity", {})}
              placeholder="quantity"
            />
          </div>
          <div className={style.submit}>
            <button type="submit" disabled={isPending}>
              {isPending ? "منتظر بمانید..." : "ثبت اطلاعات جدید"}
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

export default EditProduct;
