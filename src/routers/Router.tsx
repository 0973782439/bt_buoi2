import React, { Suspense, useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Dashboard from "../modules/Home/pages/Dashboard";
import LoginPage from "../modules/Auth/pages/LoginPage";
import NotFound from "../components/NotFound/NotFound";
import Singup from "../modules/Auth/pages/SingUpPage";
import Profile from "../modules/Auth/pages/Profile";
import Product from "../modules/Home/pages/Product";
// const Product = React.lazy(() => import("../Pages/Product/Product"));
// const Login = React.lazy(() => import("../Pages/Login/Login"));
//được bảo vệ
function ProtectedRoute() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
}
//bị từ chối
function RejectedRoute() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
const routersPublic = [
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: (
          // <LayoutDefault>
          <Dashboard />
          // </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/profile",
        element: (
          // <LayoutDefault>
          <Profile />
          // </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/product",
        element: (
          // <LayoutDefault>
          <Product />
          // </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "",
    element: <RejectedRoute></RejectedRoute>,
    children: [
      {
        path: "login",
        element: (
          // <LayoutLogin>
          <LoginPage />
          // </LayoutLogin>
        ),
      },
    ],
  },
  {
    path: "",
    element: <RejectedRoute></RejectedRoute>,
    children: [
      {
        path: "singup",
        element: (
          // <LayoutLogin>
          <Singup />
          // </LayoutLogin>
        ),
      },
    ],
  },
  // {
  //   path: "",
  //   element: <ProtectedRoute></ProtectedRoute>,
  //   children: [
  //     {
  //       path: "products",
  //       element: (
  //         <LayoutDefault>
  //           <Suspense fallback={<p>... LOADING</p>}>
  //             <Product />
  //           </Suspense>
  //         </LayoutDefault>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   path: "",
  //   element: <ProtectedRoute></ProtectedRoute>,
  //   children: [
  //     {
  //       path: "categorys",
  //       element: (
  //         <LayoutDefault>
  //           <Suspense fallback={<p>... LOADING</p>}>
  //             <Category />
  //           </Suspense>
  //         </LayoutDefault>
  //       ),
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
];
const routersPrivate = [{}];
export { routersPublic, routersPrivate };
