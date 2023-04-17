import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./modules/Auth/pages/LoginPage";
import Home from "./modules/Home/Home";
import Cookies from "js-cookie";
import Singup from "./modules/Auth/pages/SingUpPage";

function RejectedRoute() {
  const auth = Cookies.get("token");
  return !auth ? <Outlet /> : <Navigate to="/" />;
}
function ProtectedRoute() {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to="login" />;
}
function App() {
  return (
    <Routes>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="" element={<RejectedRoute />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="" element={<RejectedRoute />}>
        <Route path="singup" element={<Singup />} />
      </Route>
    </Routes>
  );
}

export default App;
