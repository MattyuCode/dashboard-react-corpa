import DepartamentoContextProvider from "../../../../contexts/DepartamentoContext";

import DepartamentoList from "./DepartamentoList";

const Departamento = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">DEPARTAMENTOS</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <DepartamentoContextProvider>
              <DepartamentoList />
            </DepartamentoContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Departamento