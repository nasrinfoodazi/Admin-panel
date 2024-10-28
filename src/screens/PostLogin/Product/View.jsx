import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getItem } from "../../../services/product";
import { PL_PRODUCT_RECORD } from "../../../reactQueryProvider/QueryKeys";

function ViewProduct() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [PL_PRODUCT_RECORD, id],
    queryFn: () => getItem(id),
  });

  return (
    (!isLoading && (
      <div>
        <div>name : {data?.data?.name}</div>
        <div>price : {data?.data?.price}</div>
        <div>quantity : {data?.data?.quantity}</div>
      </div>
    )) ||
    "loading..."
  );
}

export default ViewProduct;
