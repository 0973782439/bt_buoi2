import { useEffect, useState } from "react";
import logo from "../../../logo-420-x-108.png";
import SingUpForm from "../components/SingUpForm";
import "../pages/Auth.css";
import http from "../../../Utils/Http";
import { useNavigate } from "react-router-dom";
import { ISingUp } from "../../../interfaces/ISingUp";
import { toast } from "react-toastify";
import i18next from "i18next";
import { Language } from "../../../interfaces/ICommon";
const Singup = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  const handleChangeLanguage = (lng: Language) => {
    i18next.changeLanguage(lng);
  };
  const onSingup = async (values: ISingUp) => {
    try {
      setLoading(true);
      const dataNew = {
        ...values,
        region: Number(values.region),
        state: Number(values.state),
      };
      const data = http.post<any>("auth/register", dataNew);
      data
        .then((res: any) => {
          const { data, code } = res.data;
          if (code === 200) {
            // Cookies.set("token", data.token, {
            //   expires: values.rememberMe ? 7 : undefined,
            // });
            navigate("/");
          }
        })
        .catch((error: any) => {
          toast.error(error.response?.data?.message);
          setLoading(false);
        });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  const handleSelectedRegion = (idRegion: number) => {
    const data = http.get<any>(`location?pid=${idRegion}`);
    data.then((res: any) => {
      setState(res.data.data);
    });
  };
  useEffect(() => {
    const data = http.get<any>("location");
    data.then((res: any) => {
      setLocations(res.data.data);
    });
  }, []);
  return (
    <div>
      <section className="language fixed">
        <button
          onClick={() => handleChangeLanguage(Language.vi)}
          className="m-2 underline"
        >
          Tiếng Việt
        </button>
        <span>|</span>
        <button
          onClick={() => handleChangeLanguage(Language.en)}
          className="m-2 underline"
        >
          Tiếng Anh
        </button>
      </section>
      <section id="singup">
        <img className="logo" src={logo} alt="logopowergate" />
        <SingUpForm
          state={state}
          handleSelectedRegion={handleSelectedRegion}
          onSingup={onSingup}
          loading={loading}
          locations={locations}
        />
      </section>
    </div>
  );
};

export default Singup;
