import "./Actividad.css";

import ActividadContextProvider from "../../../../contexts/ActividadContext";
import ActividadList from "./ActividadList";

const Actividades = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Actividades</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <ActividadContextProvider>
              <ActividadList />
            </ActividadContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Actividades