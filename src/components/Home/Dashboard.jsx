import "./Dashboard.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Proyecto from "../Pages/Mantemiento/Proyecto/Proyecto";
import { data } from "jquery";
import Tarea from "../Pages/Procesos/Tarea/Tarea";

var TOTALTAREAS = 0;
const Dashboard = () => {

  const token = localStorage.getItem("accessToken");
  const [tareastotales, setTareastotales] = useState();
  const [tareasiniciadas, setTareasIniciadas] = useState();
  const [tareasnoiniciadas, setTareasnoIniciadas] = useState();
  const [tareasFinalizadas, setTareasFinalizadas] = useState();
  const [tareasAtrasadas, setTareasAtrasadas] = useState();


  const GET_TAREASTOTALES = async (accessToken) => {
    try {
      const url =
        `${axios.getUri()}/api/Dashboard/TAREAS/${localStorage.getItem("NO_CIA")}/${1}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },

      });
      var data = await response.json()

      setTareastotales(data["TAREA"])

    } catch (error) {
      console.log(error);
    }
  };
  GET_TAREASTOTALES(token);


  const GET_TAREASCOMPLETADAS = async (accessToken) => {
    try {
      const url =
        `${axios.getUri()}/api/Dashboard/TAREASCOMPLETADAS/${localStorage.getItem("NO_CIA")}/${1}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },

      });
      var data = await response.json()

      setTareasFinalizadas(data["TAREACOMPLETADA"])

    } catch (error) {
      console.log(error);
    }
  };
  GET_TAREASCOMPLETADAS(token);


  const GET_TAREASNOINICIADAS = async (accessToken) => {
    try {
      const url =
        `${axios.getUri()}/api/Dashboard/TAREAS_NO_INICIADAS/${localStorage.getItem("NO_CIA")}/${1}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },

      });
      var data = await response.json()

      setTareasnoIniciadas(data["TAREANOINICIADA"])

    } catch (error) {
      console.log(error);
    }
  };
  GET_TAREASNOINICIADAS(token);


  const GET_TAREASINICIADAS = async (accessToken) => {
    try {
      const url =
        `${axios.getUri()}/api/Dashboard/TAREAS_INICIADAS/${localStorage.getItem("NO_CIA")}/${1}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },

      });
      var data = await response.json()

      setTareasIniciadas(data["TAREAINICIADA"])

    } catch (error) {
      console.log(error);
    }
  };
  GET_TAREASINICIADAS(token);



  const GET_TAREASATRASADAS = async (accessToken) => {
    try {
      const url =
        `${axios.getUri()}/api/Dashboard/TAREAS_ATRASADAS/${localStorage.getItem("NO_CIA")}/${1}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },

      });
      var data = await response.json()
      setTareasAtrasadas(data["TAREASATRASADAS"])
    } catch (error) {
      console.log(error);
    }
  };
  GET_TAREASATRASADAS(token);








  return (


    <div id="wrapper">


      <div id="content-wrapper" class="d-flex flex-column">


        <div id="content">

          <div class="container-fluid">


            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h1 mb-0 text-gray-800">Dashboard</h1>

              <Link to="/createTarea" className="btn btnCrea btn-primary">
                <AiOutlinePlus />
                &nbsp; Tarea
              </Link>
            </div>


            <div class="row">


              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          TAREAS </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{tareastotales}</div>
                      </div>
                      <div class="col-auto">

                        <i class="fas fa-bezier-curve fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Tareas Finalizadas</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{tareasFinalizadas}</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-tasks fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Tareas Iniciadas</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{tareasiniciadas}</div>
                      </div>
                      <div class="col-auto">
                        <div class="col-auto">
                          <div class="fa-3x">

                            <i class="fas fa-cog fa-spin text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Tareas No Iniciadas</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{tareasnoiniciadas}</div>
                      </div>
                      <div class="col-auto fa-3x">
                        <i class="fas fa-cog  text-gray-300"></i>
                      </div>


                    </div>
                  </div>
                </div>
              </div>



              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">TAREAS ATRASADAS
                        </div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{tareasAtrasadas}</div>
                          </div>{/*
                          <div class="col">
                            <div class="progress progress-sm mr-2">
                              <div class="progress-bar bg-info" role="progressbar"
                                style={{ width: "30%" }}

                                aria-valuemax="100"></div>
                            </div>
                          </div>
                           */}
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-business-time fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <div class="row">

              {/* <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Projectos</h6>
                </div>
                <div class="card-body">
                  <h4 class="small font-weight-bold">Proyectos Finalizados <span
                    class="float-right">20%</span></h4>
                  <div class="progress mb-4">
                    <div class="progress-bar bg-danger" role="progressbar" style={{ width: "20%" }}
                      aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4 class="small font-weight-bold">Sub Proyectos Finalizados<span
                    class="float-right">40%</span></h4>
                  <div class="progress mb-4">
                    <div class="progress-bar bg-warning" role="progressbar" style={{ width: "40%" }}
                      aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4 class="small font-weight-bold">Tareas Completadas <span
                    class="float-right">60%</span></h4>
                  <div class="progress mb-4">
                    <div class="progress-bar" role="progressbar" style={{ width: "60%" }}
                      aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4 class="small font-weight-bold">Tareas <span
                    class="float-right">80%</span></h4>
                  <div class="progress mb-4">
                    <div class="progress-bar bg-info" role="progressbar" style={{ width: "80%" }}
                      aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4 class="small font-weight-bold">Account Setup <span
                    class="float-right">Complete!</span></h4>
                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style={{ width: "20%" }}
                      aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div> */}





              {/* 
              <div class="col-xl-12 col-lg-7">
                <div class="card shadow mb-4">

                  <div
                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Lista de Tareas</h6>
                    <div class="dropdown no-arrow">
                    </div>

                  </div>



                </div>
              </div>
*/}


            </div>


            <Tarea></Tarea>
            {/* <Proyecto></Proyecto> */}


          </div>



        </div>




      </div>


    </div>










  );
};

export default Dashboard;
