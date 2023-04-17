import { useEffect, useState } from "react";
import logo from "../../../logo-420-x-108.png";
import SingUpForm from "../components/SingUpForm";
import "../pages/Auth.css";
import http from "../../../Utils/Http";
import { useNavigate } from "react-router-dom";
import { ISingUp } from "../../../interfaces/SingUp";

const Singup = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  const onSingup = async (values: ISingUp) => {
    try {
      setLoading(true);
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
  );
};

export default Singup;
