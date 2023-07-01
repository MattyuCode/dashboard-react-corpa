
import SubAreaContextProvider from "../../../../contexts/SubAreaContext";
import SubAreaList from "./SubAreaList";

const SubArea = (props) => {

  return (
    <div className="container mt-4 ">

      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">SUBAREAS</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">

            <SubAreaContextProvider>
              <SubAreaList />
            </SubAreaContextProvider>

          </div>
        </div>
      </div>
    </div>
  );
}
export default SubArea