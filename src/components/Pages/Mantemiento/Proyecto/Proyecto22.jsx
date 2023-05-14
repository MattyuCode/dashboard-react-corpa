import './Proyecto.css';
import FrmProyecto from './FrmProyecto';
import FrmSubProyecto from './FrmSubProyecto';
import FrmArea from './FrmArea';
import FrmSubArea from './FrmSubArea';
import FrmEquipo from './FrmEquipo';
import FrmParte from './frmParte';
import React, { useState } from 'react';
import ListProyect from './ListaProyectos';



const Proyecto = () => {
  const [show, setShow] = useState(0);
  return (




    <section className="content">

      <div className="container-fluid">

        <div className="row m-1 row Justigy-content-cente">
          <div className="col-12 col-sm-12 col-lg-12 ">
            <div className="card card-primary card-outline card-tabs">
              <div className="card-header p-0 pt-1 border-bottom-0">
                <ul className="nav nav-tabs" role="tablist">

                  <li className="nav-item">
                    <a onClick={() => {
                      setShow(1);
                    }} className="nav-link">PROYECTO</a>

                  </li>

                  <li>
                    <a onClick={() => {
                      setShow(2);
                    }} className="nav-link">SUBPROYECTO</a>
                  </li>
                  <li>
                    <a onClick={() => {
                      setShow(3);
                    }} className="nav-link">AREA</a>
                  </li>
                  <li>
                    <a onClick={() => {
                      setShow(4);
                    }} className="nav-link">SUBAREA</a>
                  </li>
                  <li>
                    <a onClick={() => {
                      setShow(5);
                    }} className="nav-link">EQUIPO</a>
                  </li>
                  <li>
                    <a onClick={() => {
                      setShow(6);
                    }} className="nav-link">PARTE</a>
                  </li>
                </ul>
              </div>


              <div className="card-body">
                <div className="tab-content">


                  <div className="tab-pane fade show active bg-" id="tabBusqueda" role="tabpanel">
                    <div id="divBusqueda">
                      <div className="row">
                        <div className="col-md-12 text-center">



                          <section className="content card-header p-1 pt-3 pb-3 border-bottom-0">

                            <div className="container-fluid ">
                              <div className="card-body card-header p-0 pt-1 border-bottom-0">
                                <div className="tab-content">

                                  {/* <FrmProyecto></FrmProyecto>
                                <FrmSubProyecto></FrmSubProyecto>
                                <FrmArea></FrmArea>
                                 <FrmSubArea></FrmSubArea>
                                   <FrmEquipo></FrmEquipo>
                                   <FrmParte></FrmParte>
                               
                               */ }

                                  {ShowFormularios(show)}

                                </div>
                              </div>
                            </div>


                          </section >

                          <ListProyect></ListProyect>


                        </div>


                      </div>
                    </div>


                  </div>
                </div>



              </div>
            </div>



          </div>
        </div>
      </div>


    </section >


  );
}

export default Proyecto



 function ShowFormularios(props) {
  if (props == 1) {
    return <FrmProyecto></FrmProyecto>
  }
  if (props == 2) {
    return <FrmSubProyecto></FrmSubProyecto>
  }

  if (props == 3) {
    return <FrmArea></FrmArea>
  }
  if (props == 4) {
    return <FrmSubArea></FrmSubArea>
  }
  if (props == 5) {
    return <FrmEquipo></FrmEquipo>
  }
  if (props == 6) {
    return <FrmParte></FrmParte>
  }

} 