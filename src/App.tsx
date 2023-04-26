import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { routersPublic } from "./routers/Router";
// function RejectedRoute() {
//   const auth = Cookies.get("token");
//   return !auth ? <Outlet /> : <Navigate to="/" />;
// }
// function ProtectedRoute() {
//   const auth = Cookies.get("token");
//   return auth ? <Outlet /> : <Navigate to="login" />;
// }
function App() {
  return (
    // <Routes>
    //   <Route path="" element={<ProtectedRoute />}>
    //     <Route path="/" element={<Home />} />
    //   </Route>
    //   <Route path="" element={<RejectedRoute />}>
    //     <Route path="login" element={<LoginPage />} />
    //   </Route>
    //   <Route path="" element={<RejectedRoute />}>
    //     <Route path="singup" element={<Singup />} />
    //   </Route>
    // </Routes>
    <Routes>
      {routersPublic.map((router, indx) => {
        return (
          <Route
            key={indx}
            path={router.path}
            element={router.element}
            children={router.children?.map((children, ind) => {
              return (
                <Route
                  key={ind}
                  path={children.path}
                  element={children.element}
                />
              );
            })}
          ></Route>
        );
      })}
    </Routes>
  );
}

export default App;
