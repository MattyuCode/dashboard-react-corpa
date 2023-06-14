import AdvertenciaContextProvider from "../../../../contexts/AdvertenciaContext";
import AdvertenciaList from "./AdvertenciaList";

const Advertencia = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">LUGAR ADVERTENCIA</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <AdvertenciaContextProvider>
              <AdvertenciaList />
            </AdvertenciaContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Advertencia