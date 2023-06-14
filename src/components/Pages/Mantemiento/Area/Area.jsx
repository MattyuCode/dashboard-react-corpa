import AreaContextProvider from "../../../../contexts/AreaContext";
import AreaList from "./AreaList";

const Area = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">AREAS</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <AreaContextProvider>
              <AreaList />
            </AreaContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Area