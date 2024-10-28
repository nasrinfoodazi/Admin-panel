import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/product";
import { PL_PRODUCT_LIST } from "../../reactQueryProvider/QueryKeys";

import style from "./modal.module.css";
import close from "../../assets/image/Close.svg";
import { enqueueSnackbar } from 'notistack';
function DeleteProduct({ ids = [], onSuccess, dialogRef }) {
  const queryClient = useQueryClient();
  //update/create
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => deleteProduct(data),
  });
  const onDelete = () => {
    mutate(
      {
        ids,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [PL_PRODUCT_LIST] });
          dialogRef?.current?.close();
          enqueueSnackbar('حذف با موفقیت انجام شد .', { variant: 'success' })
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
      <div className={[style.container, style.containerDelet].join(" ")}>
        <img src={close} alt="" />
        <p>آیا از حذف این محصول مطمئنید؟</p>
        <div className={[style.submit, style.btnDel].join(" ")}>
          <button onClick={onDelete}>حذف</button>
          <button
            onClick={() => {
              dialogRef?.current?.close();
              setTimeout(() => {
                onSuccess();
              }, 700);
            }}
          >
            لغو
          </button>
        </div>
      </div>
    )) ||
    "loading..."
  );
}

export default DeleteProduct;
