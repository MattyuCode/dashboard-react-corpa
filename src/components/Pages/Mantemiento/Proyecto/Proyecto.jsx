import ProyectoContextProvider from "../../../../contexts/ProyectoContext";
import ProyectoList from "./ProyectoList";

const Proyecto = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">PROYECTOS</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <ProyectoContextProvider>
              <ProyectoList />
            </ProyectoContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Proyecto