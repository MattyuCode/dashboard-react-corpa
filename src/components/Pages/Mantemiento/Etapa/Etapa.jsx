
// import 'bootstrap/dist/css/bootstrap.min.css';

import EtapaContextProvider from "../../../../contexts/EtapaContext";
import EtapaList from "./EtapaList";

const Etapa = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">ETAPAS</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <EtapaContextProvider>
              <EtapaList />
            </EtapaContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Etapa