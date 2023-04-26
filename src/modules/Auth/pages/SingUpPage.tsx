import { useEffect, useState } from "react";
import logo from "../../../logo-420-x-108.png";
import SingUpForm from "../components/SingUpForm";
import "../pages/Auth.css";
import http from "../../../Utils/Http";
import { ILocation, ISingUp } from "../../../interfaces/ISingUp";
import i18next from "i18next";
import { Language } from "../../../interfaces/ICommon";
import { useAppDispatch } from "../../../app/hooks";
import { AuthActions } from "../../../app/Redux/Auth.slice";
import { IResponseApi } from "../../../interfaces/ICommon";
const Singup = () => {
  const [locations, setLocations] = useState([]);
  const [state, setState] = useState([]);
  const dispatch = useAppDispatch();
  const handleChangeLanguage = (lng: Language) => {
    i18next.changeLanguage(lng);
  };
  const onSingup = async (values: ISingUp) => {
    const dataNew = {
      ...values,
      region: Number(values.region),
      state: Number(values.state),
    };
    dispatch(AuthActions.singup(dataNew));
  };
  const handleSelectedRegion = (idRegion: number) => {
    const data = http.get(`location?pid=${idRegion}`);
    data.then((res: any) => {
      setState(res.data.data);
    });
  };
  useEffect(() => {
    const data = http.get<IResponseApi<ILocation>>("location");
    data.then((res: IResponseApi<any>) => {
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
          locations={locations}
          handleSelectedRegion={handleSelectedRegion}
          onSingup={onSingup}
        />
      </section>
    </div>
  );
};

export default Singup;
