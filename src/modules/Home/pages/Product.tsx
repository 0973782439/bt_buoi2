import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  getProductById,
  getProduct,
  updateProduct,
} from "../../../api/Product.api";
import { IProduct } from "../../../interfaces/IProduct";
import Input from "../../../components/Input/Input";
import { useForm } from "react-hook-form";
import { rules as Rules } from "../../../Utils/Rules";

interface Props {}
const status = [
  { id: 1, name: "PENDING" },
  { id: 2, name: "RECEIVED" },
  { id: 3, name: "PROCESSING" },
  { id: 4, name: "FULFILLED" },
];
const client = [
  { id: 1, name: "AVB" },
  { id: 2, name: "Powergate" },
  { id: 3, name: "Adidas" },
  { id: 4, name: "Yopmail" },
];
export default function Product({}: Props) {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IProduct>();
  const rules = Rules(getValues);
  const perPage = 2;

  const [currenPage, setCurrenPage] = useState<number>(1);
  const [product, setProduct] = useState<IProduct[]>([]);
  const [data, setData] = useState<IProduct[]>([]);
  const [dataEdit, setDataEdit] = useState<IProduct>();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState(""); // ngày bắt đầu
  const [toDate, setToDate] = useState(""); // ngày kết thúc
  const [id, setId] = useState<any>();
  const totalPage = Math.floor(data?.length / 2);

  const fetchData = () => {
    const res = getProduct();
    res.then((res: any) => {
      const dataNew = res.data.data.slice(
        (currenPage - 1) * perPage,
        (currenPage - 1) * perPage + perPage
      );
      setProduct(dataNew);
      setData(res.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [currenPage]);

  const handleSetValue = () => {
    if (dataEdit) {
      setValue("status", dataEdit.status);
      setValue("client", dataEdit.client);
      setValue("total", dataEdit.total);
      setValue("fundingMethod", dataEdit.fundingMethod);
      setValue("invoice", dataEdit.invoice);
      setValue("order", dataEdit.order);
      setValue("currency", dataEdit.currency);
    }
  };
  useEffect(() => {
    if (dataEdit) {
      handleSetValue();
    }
  }, [dataEdit]);
  const onSubmit = async (values: any) => {
    const newData = {
      ...values,
      id: dataEdit?.id,
      total: Number(values.total),
    };
    const json = updateProduct(newData);
    json.then((res: any) => {
      fetchData();
      setIsModalEdit(false);
    });
  };
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter: any = data?.filter(
      (item: IProduct) => item.status == e.target.value
    );
    setProduct(filter);
  };
  const handleChangeClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter: any = data?.filter(
      (item: IProduct) => item.client == e.target.value
    );
    setProduct(filter);
  };
  const handleClose = () => {
    setIsModal(false);
    setId(undefined);
  };
  const handleCloseModalEdit = () => {
    setIsModalEdit(false);
    setId(undefined);
  };
  const handleAgree = () => {
    const res = deleteProduct(id);
    res.then((succees: any) => {
      fetchData();
      setIsModal(false);
    });
  };
  const handleDelete = (id: number) => {
    setIsModal(true);
    setId(id);
  };
  const handleEdit = (id: number) => {
    const json = getProductById(id);
    json.then((res: any) => {
      setDataEdit(res.data.data);
    });
    setIsModalEdit(true);
  };
  function filterByDate(dataList: any, fromDate: string, toDate: string) {
    return dataList?.filter((item: any) => {
      const date = new Date(item.createdAt);
      return date >= new Date(fromDate) && date <= new Date(toDate);
    });
  }
  const handleChangeFromDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    const filter = filterByDate(data, e.target.value, toDate);
    setProduct(filter);
  };
  const handleChangeToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    const filter = filterByDate(data, fromDate, e.target.value);
    setProduct(filter);
  };
  const handleNext = () => {
    setCurrenPage(currenPage + 1);
  };
  const handlePrev = () => {
    setCurrenPage(currenPage - 1);
  };
  const handleChossePage = (page: any) => {
    setCurrenPage(page);
  };
  return (
    <section className="max-w-7xl m-auto">
      <div className="flex justify-between mt-36 mb-5">
        <h2 className="font-bold text-2xl">Payroll Transactions List</h2>
        <button className="border-blue-500 border py-1 px-5 bg-blue-500 text-white">
          Export
        </button>
      </div>
      <div className="flex justify-between my-10">
        <div className="flex gap-8">
          <select
            defaultValue="selected"
            onChange={(e) => handleChangeStatus(e)}
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="selected" disabled>
              Status
            </option>
            {status.map((item: any) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <select
            defaultValue="selected"
            id="client"
            onChange={(e) => handleChangeClient(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="selected" disabled>
              Client
            </option>
            {client.map((item: any) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            name="from"
            onChange={(e) => handleChangeFromDate(e)}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            name="to"
            onChange={(e) => handleChangeToDate(e)}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="invoice"
            placeholder="invoice#"
          />
        </div>
        <div className="flex gap-8">
          <button className="border-blue-500 border py-1 px-6  text-blue-500">
            Aply
          </button>
          <button className="border-red-500 border py-1 px-5  text-red-500">
            Clear
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  FundingMethod
                </th>
                <th scope="col" className="px-6 py-3">
                  Client
                </th>
                <th scope="col" className="px-6 py-3">
                  Currency
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Invoice#
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product?.map((item: IProduct) => {
                return (
                  <tr
                    onDoubleClick={() => handleEdit(item.id)}
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.status}
                    </th>
                    <td className="px-6 py-4">{item.fundingMethod}</td>
                    <td className="px-6 py-4">{item.client}</td>
                    <td className="px-6 py-4">{item.currency}</td>
                    <td className="px-6 py-4">{item.total}</td>
                    <td className="px-6 py-4">{item.invoice}</td>
                    <td className="px-6 py-4">
                      <button
                        className="btn border px-1.5 border-separate"
                        onClick={() => handleEdit(item.id)}
                      >
                        View detail
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="btn border bg-red-600 text-white px-1.5 border-separate"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <p>Showing 10 from 46 data</p>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePrev()}
              >
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            {Array(totalPage)
              .fill(0)
              .map((item: number, idx) => {
                const numberPage = idx + 1;
                return (
                  <li key={idx}>
                    <a
                      aria-current="page"
                      href="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => handleChossePage(numberPage)}
                    >
                      {numberPage}
                    </a>
                  </li>
                );
              })}
            {/* <li>
              <a
                href="#"
                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                1
              </a>
            </li> */}

            <li>
              <button
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleNext}
              >
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isModal && (
        <div
          style={{
            transform: "translate(-50%,-50%)",
            top: "50%",
            left: "50%",
          }}
          id="popup-modal"
          className="fixed z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 "
        >
          <div className="relative w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => handleAgree()}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => handleClose()}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalEdit && (
        <div
          style={{
            transform: "translate(-50%,-50%)",
            top: "50%",
            left: "50%",
          }}
          id="popup-modal"
          className="fixed z-50 p-4 md:inset-0 "
        >
          <div className="relative w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-10">
              <h2 className="font-bold text-center">Edit Product</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded"
              >
                <div className="mb-6 flex gap-6">
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{ ...register("status", rules.isRequired) }}
                    name="status"
                    type="text"
                    placeholder="status"
                    label="Status"
                    id="status"
                  ></Input>
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{ ...register("currency", rules.isRequired) }}
                    name="currency"
                    type="text"
                    placeholder="currency"
                    label="currency"
                    id="currency"
                  ></Input>
                </div>
                <div className="mb-6 flex gap-6">
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{
                      ...register("fundingMethod", rules.isRequired),
                    }}
                    name="fundingMethod"
                    type="text"
                    placeholder="fundingMethod"
                    label="fundingMethod"
                    id="fundingMethod"
                  ></Input>
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{ ...register("total", rules.isRequired) }}
                    name="total"
                    type="text"
                    placeholder="total"
                    label="total"
                    id="total"
                  ></Input>
                </div>
                <div className="mb-6 flex gap-6">
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{
                      ...register("order", rules.isRequired),
                    }}
                    name="order"
                    type="text"
                    placeholder="order"
                    label="order"
                    id="order"
                  ></Input>
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{ ...register("client", rules.isRequired) }}
                    name="client"
                    type="text"
                    placeholder="client"
                    label="client"
                    id="client"
                  ></Input>
                </div>
                <div className="mb-6 flex gap-6">
                  <Input
                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
                    register={{
                      ...register("invoice", rules.isRequired),
                    }}
                    name="invoice"
                    type="text"
                    placeholder="invoice"
                    label="invoice"
                    id="invoice"
                  ></Input>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => handleCloseModalEdit()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
