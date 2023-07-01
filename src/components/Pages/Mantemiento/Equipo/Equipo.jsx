import EquipoContextProvider from "../../../../contexts/EquipoContext";
import EquipoList from "./EquipoList";

const Equipo = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">EQUIPO</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <EquipoContextProvider>
              <EquipoList />
            </EquipoContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Equipo