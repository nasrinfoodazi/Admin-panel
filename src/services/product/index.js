import { AxiosInstance } from "../axios";
export const ListService = (payload) => AxiosInstance.get("/products?" + payload);
export const getItem = (id) => AxiosInstance.get("/products/" + id);
export const createProduct = (payload) =>
  AxiosInstance.post("/products", payload);

export const updateProduct = (id, payload) => AxiosInstance.put("/products/" + id, payload);
export const deleteProduct = (payload) => {
  return AxiosInstance.delete("/products", { data: payload })
};


