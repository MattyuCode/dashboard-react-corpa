import React from "react";
import ReporteList from "./ReporteList";
const Reporte=()=>{

   
    return (
        <div className="container mt-4 ">
    
          <div className="row">
            <div className="col-md-12">
              <span className="titless text-center">REPORTE</span>
            </div>
    
            <div className="col-md-12 ">
              <div className="tab-contentAct card shadow">
    
                <ReporteList> </ReporteList>
    
              </div>
            </div>
          </div>
        </div>
      );
}

export default Reporte;