import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ListService } from "../../../services/product";
import { PL_PRODUCT_LIST } from "../../../reactQueryProvider/QueryKeys";
import AddProduct from "../../../components/Product/Add";
import EditProduct from "../../../components/Product/Edit";
import { useEffect, useRef, useState } from "react";
import DeleteProduct from "../../../components/Product/Delete";
import ReactPaginate from 'react-paginate';
import "../../../styles/index.css";
import "../../../styles/font.css";
import edit from "../../../assets/image/edit.svg";
import trash from "../../../assets/image/trash.svg";
import list from "../../../assets/image/setting-3.svg";
import Search from "../../../assets/image/search-normal.svg";
import Admin from "../../../assets/image/admin.jpeg";
import { useAuth } from "../../../hooks/AuthProvider";

function List() {
  const [selectedItem, setSelectedItem] = useState({});
  const [searchInfo, setSearchInfo] = useState({ page: 1, limit: 7 });
  const { logOut, getUserInfo } = useAuth();
  const userInfo = getUserInfo()
  const queryClient = useQueryClient();
  const addRef = useRef();
  const editRef = useRef();
  const deleteRef = useRef();
  const serialize = function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  //only Get
  const { data, isLoading } = useQuery({
    queryKey: [PL_PRODUCT_LIST, serialize(searchInfo)],
    queryFn: () => ListService(serialize(searchInfo)),
    // refetchInterval: 400,
  });

  // useEffect(() => {
  //   setQueryString(serialize(searchInfo));
  // }, [searchInfo]);

  const updateSearch = (key, val) => {
    if (val) {
      setSearchInfo({
        ...searchInfo,
        page: 1,
        [key]: val,
      });
    } else {
      Reflect.deleteProperty(searchInfo, key);
      setSearchInfo({
        ...searchInfo,
        page: 1,
      });
    }
  };
  return (
    <div className="container_list">
      <header>
        <div>
          <img src={Search} alt="" />
          <input
            placeholder="جستجو  کالا"
            onChange={(e) => {
              let val = e.target.value;
              updateSearch("name", val);
            }}
          />
        </div>
        <div>
          <img src={Admin} alt="" />
          <div>
            <h4 className={StylePropertyMap.adminName}>{userInfo?.username}</h4>
            <span> مدیر سایت</span>
            <span className="logout" onClick={() => {

              logOut(queryClient)
            }}>  خروج  </span>

          </div>
        </div>

      </header>


      {!data && isLoading && <div>منتظر بمانید...</div>}

      <div className="head-list">
        <h3>
          <img src={list} alt="" />
          <span> مدیریت کالا</span>
        </h3>
        <button
          className="add_btn"
          onClick={() => {
            setSelectedItem({ type: "add" });
            addRef.current.showModal();
          }}
        >
          افزودن محصول
        </button>
      </div>
      {data && !isLoading && (
        <>
          <table className="product_table">
            <thead>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th></th>
            </thead>
            <tbody>
              {data?.data?.data?.map((i) => (
                <tr key={i.id.toString()}>
                  <td>{i.name}</td>
                  <td>{i.price}</td>
                  <td>{i.quantity}</td>
                  <td>{i.id}</td>
                  <td>
                    <div className="action-cell">
                      <div
                        onClick={() => {
                          setSelectedItem({
                            type: "edit",
                            id: i.id,
                          });
                          editRef.current.showModal();
                        }}
                      >
                        <img src={edit} alt="" />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedItem({
                            type: "delete",
                            id: i.id,
                          });
                          deleteRef.current.showModal();
                        }}
                      >
                        <img src={trash} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="paginate">
            {
              (data?.data?.totalProducts && (
                <ReactPaginate
                  nextLabel=" >"
                  onPageChange={(e) => {
                    setSearchInfo({
                      ...searchInfo,
                      page: e.selected + 1,
                    })
                  }}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={Math.ceil((data?.data?.totalProducts || 0) / searchInfo.limit)}
                  previousLabel="< "
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              )) || null
            }


          </div>
        </>
      )}

      <dialog ref={addRef}>
        {(selectedItem?.type === "add" && (
          <AddProduct
            onSuccess={() => setSelectedItem({})}
            dialogRef={addRef}
          />
        )) ||
          null}
      </dialog>

      <dialog ref={editRef}>
        {(selectedItem?.type === "edit" && (
          <EditProduct
            productId={selectedItem.id}
            onSuccess={() => setSelectedItem({})}
            dialogRef={editRef}
          />
        )) ||
          null}
      </dialog>
      <dialog ref={deleteRef}>
        {(selectedItem?.type === "delete" && (
          <DeleteProduct
            ids={[selectedItem.id]}
            onSuccess={() => setSelectedItem({})}
            dialogRef={deleteRef}
          />
        )) ||
          null}
      </dialog>
    </div>
  );
}

export default List;
