import ParteContextProvider from "../../../../contexts/ParteContext";
import ParteList from "./ParteList";

const Parte = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">PARTE</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <ParteContextProvider>
              <ParteList />
            </ParteContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Parte