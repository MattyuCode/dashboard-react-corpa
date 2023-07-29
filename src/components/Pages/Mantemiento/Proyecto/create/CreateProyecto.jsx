import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import "./CreateProyecto.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";


import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import Form from 'react-bootstrap/Form';
registerLocale("es", es);
const CreateProyecto = () => {

  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [redirect, setRedirect] = useState(false);


  var { ID } = useParams();


  const usenavigate = useNavigate();
  var [fechainicio, setFechaInicio] = useState('');
  var [fechafin, setFechaFin] = useState('')
  var [nombre, setNombre] = useState('')
  var [descripcion, setDescripcion] = useState('')
  var [usuariocrea, setUsuarioCrea] = useState('')
  var [estado, setEstado] = useState('')

  var [bool, setBool] = useState(true)
  let token = localStorage.getItem("accessToken");
  var isenalbeActividad = 'N'
  var isenabledEtapa = 'N'
  var isenabledLugarAdvertencia = 'N'
  var isenabledArea = 'N'
  var isenabledSubAarea = 'N'
  const Token = {
    headers: { Authorization: `Bearer ${token}` }
  };

  function comprobarseleccion() {
    var chekActividad = document.getElementById('actividad').checked
    var checkEtapa = document.getElementById('etapa').checked
    var checkLugarAdvertencia = document.getElementById('lugaradvertencia').checked
    var chekArea = document.getElementById('area').checked
    var chekSubArea = document.getElementById('subarea').checked

    isenalbeActividad = chekActividad ? "S" : "N"
    isenabledEtapa = checkEtapa ? "S" : "N"
    isenabledLugarAdvertencia = checkLugarAdvertencia ? "S" : "N"
    isenabledArea = chekArea ? "S" : "N"
    isenabledSubAarea = chekSubArea ? "S" : "N"

  }

  //ACTUALIZAR PROYECTO
  if (ID != 0) {

    const API_SUBPROYECTO = async (accessToken) => {
      try {
        const url =
          `${axios.getUri()}/api/PROYECTO/Select/${localStorage.getItem("NO_CIA")}/${ID}`;

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        if (bool) {
          document.getElementById("descripcion").value = data[0]["DESCRIPCION"];

          //setDate1(new Date("2023-05-18T00:00:00"))
          setDate1(new Date(DecodeformatDate(data[0]["INICIO"])))
          setDate2(new Date(DecodeformatDate(data[0]["FIN"])))
          document.getElementById('nombre').value = data[0]["NOMBRE"]
          data[0]["BLK_ACTIVIDAD"] == "S" ? document.getElementById('actividad').checked = true : document.getElementById('actividad').checked = false
          data[0]["BLK_ETAPA"] == "S" ? document.getElementById('etapa').checked = true : document.getElementById('etapa').checked = false
          data[0]["BLK_LUGAR"] == "S" ? document.getElementById('lugaradvertencia').checked = true : document.getElementById('lugaradvertencia').checked = false
          data[0]["BLK_AREA"] == "S" ? document.getElementById('area').checked = true : document.getElementById('area').checked = false
          data[0]["BLK_SUBAREA"] == "S" ? document.getElementById('subarea').checked = true : document.getElementById('subarea').checked = false
         


          setBool(false)
        }

        setUsuarioCrea(data[0]["USUARIO_CREA"]);
        setEstado(data[0]["ESTADO"]);

      } catch (error) {
        
      }
    };
    API_SUBPROYECTO(token);

  }


  async function SaveProyect() {
    var f1 = new Date(date1)
    var f2 = new Date(date2)
    if (ID < 1) {


      if (f1 <= f2) {

        descripcion = document.getElementById("descripcion").value;
        fechainicio = document.getElementById("fechainicio").value;
        fechafin = document.getElementById("fechafin").value;
        nombre = document.getElementById("nombre").value;
        
        axios.post('/api/PROYECTO/Insert', {
          nO_CIA: localStorage.getItem("NO_CIA"),
          descripcion: descripcion,
          inicio: fechainicio,
          fin: fechafin,
          usuariO_CREA: localStorage.getItem("USERS"),
          estado: "I",
          nombre: nombre,
          blk_actividad: isenalbeActividad,
          blk_lugar: isenabledLugarAdvertencia,
          blk_area: isenabledArea,
          blk_subarea: isenabledSubAarea,
          blk_etapa: isenabledEtapa

          //CORRECCION
        }, Token)
          .then(await function (response) {

            Swal.fire({
              icon: 'success',
              title: response.data["msg"],
              showConfirmButton: false,
              timer: 1500
            })


            return usenavigate("/proyecto");
          })
          .catch(await function (error) {

            Swal.fire({
              icon: 'error',
              title: error.request["status"],
              showConfirmButton: false,
              timer: 2000
            })

          });
      } else {


        Swal.fire('La Fecha Inicial debe de Ser Menor a  a la fecha Final')


      }
    } else {

      if (f1 <= f2) {
        descripcion = document.getElementById("descripcion").value;
        fechainicio = document.getElementById("fechainicio").value;
        fechafin = document.getElementById("fechafin").value;
        nombre = document.getElementById("nombre").value;
        
        axios.put(`/api/PROYECTO/${ID}`, {
          nO_CIA: localStorage.getItem("NO_CIA"),
          descripcion: descripcion,
          inicio: fechainicio,
          fin: fechafin,
          usuario_crea: usuariocrea,
          estado: estado,
          nombre: nombre,
          blk_actividad: isenalbeActividad,
          blk_lugar: isenabledLugarAdvertencia,
          blk_area: isenabledArea,
          blk_subarea: isenabledSubAarea,
          blk_etapa: isenabledEtapa

        }, Token)
          .then(await function (response) {

            Swal.fire({
              icon: 'success',
              title: response.data["msg"],
              showConfirmButton: false,
              timer: 1500
            })


            setDescripcion('');
            setFechaInicio('');
            setFechaFin('');
            return usenavigate("/proyecto");
          })
          .catch(await function (error) {

            Swal.fire({
              icon: 'error',
              title: error.request["status"],
              showConfirmButton: false,
              timer: 2000
            })

          });

      } else {
        Swal.fire('La Fecha Inicial debe de Ser Menor a  a la fecha Final')

      }
    }
  }




  if (redirect) {
    return usenavigate("/proyecto");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    descripcion = document.getElementById("descripcion").value;
    fechainicio = document.getElementById("fechainicio").value;
    fechafin = document.getElementById("fechafin").value;
    let result = true;
    if (
      !fechainicio.trim() ||
      !fechafin.trim() ||
      !descripcion.trim()
    ) {
      result = false;
      
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });
     
      document.getElementById("nombre").classList.remove("is-valid");
      document.getElementById("nombre").classList.add("is-invalid");

      document.getElementById("fechainicio").classList.remove("is-valid");
      document.getElementById("fechainicio").classList.add("is-invalid");


      document.getElementById("fechafin").classList.remove("is-valid");
      document.getElementById("fechafin").classList.add("is-invalid");


      
      document.getElementById("descripcion").classList.remove("is-valid");
      document.getElementById("descripcion").classList.add("is-invalid");


      
    } else {

      SaveProyect();
      document.getElementById("nombre").classList.remove("is-invalid");
      document.getElementById("nombre").classList.add("is-valid");

      document.getElementById("fechainicio").classList.remove("is-invalid");
      document.getElementById("fechainicio").classList.add("is-valid");

      document.getElementById("fechafin").classList.remove("is-invalid");
      document.getElementById("fechafin").classList.add("is-valid");

      document.getElementById("descripcion").classList.remove("is-invalid");
      document.getElementById("descripcion").classList.add("is-valid");
    }
    return result;
  };

  return (

    <div className="container mt-4  contCreateActivi border">

      <div className="row rowALl">
        <div className="col-md-12">

          <span className="text-center titless " style={{}}>
            Proyecto
          </span>
        </div>

        <div className="col-md-12">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            <div className="row  ">
              {/* <div className="card-body py-5 px-md-5"> */}
              <form onSubmit={handleInputChange} autoComplete="off">


              <div className="row">
                  <div className="col-md-6 mb-5">
                    <div className="form-outline">
                      <label className="form-label">NOBRE</label>
                      <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        name="nombre"

                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
                    <div className="form-outline">
                      <label className="form-label">DESCRIPCION</label>
                      <textarea
                        type="text"
                        id="descripcion"
                        className="form-control"
                        name="descripcion"

                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4 ">
                    <div className="form-outline">
                      <div>
                        <label className="form-label">FECHA INICIO</label>
                        <DatePicker selected={date1} onChange={(date) => setDate1(date)}
                          locale="es"
                          showIcon
                          dateFormat="dd/MM/yyyy"
                          className="form-control" id="fechainicio"
                          isClearable
                          placeholderText="dd/mm/yy"
                        />
                      </div>


                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA FIN</label>
                      <DatePicker selected={date2} onChange={(date) => setDate2(date)} locale="es"
                        showIcon
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        placeholderText="dd/mm/yy"
                       
                        className="form-control" id="fechafin" />

                    </div>

                  </div>

                </div>

                

                <div class="panel panel-default br ">
                  <div class="panel-heading border bg-light text-info">Bloquear Sub Proyectos</div>
                  <div class="panel-body border">

                    <div style={{ marginLeft: "20px", marginTop:"10px" }}>
                      <div class="row ">
                        <div className="col-md-4 ml-3">
                          <div class="custom-control custom-switch " >
                            <Form.Check
                              onChange={comprobarseleccion}
                              type="switch"

                              label="ACTIVIDAD"
                              id="actividad"
                            />

                          </div>
                        </div>
                        <div className="col-md-2 ml-3" >
                        </div>
                        <div className="col-md-4 ml-3" >
                          <div class="custom-control custom-switch  "  >
                            <Form.Check
                            
                              onChange={comprobarseleccion}
                              type="switch"
                              label="ETAPA"
                              id="etapa"
                              
                            />
                          </div>

                        </div>
                      </div>


                      <div class="row ">
                        <div className="col-md-4 ml-3">
                          <div class="custom-control custom-switch " >
                            <Form.Check
                              onChange={comprobarseleccion}
                              type="switch"
                              label="LUGAR ADVERTENCIA"
                              id="lugaradvertencia"
                            />

                          </div>
                        </div>
                        <div className="col-md-2 ml-3" >
                        </div>
                        <div className="col-md-4 ml-3">
                          <div class="custom-control custom-switch  " >
                            <Form.Check
                              onChange={comprobarseleccion}
                              type="switch"
                              label="AREA"
                              id="area"
                            />
                          </div>
                        </div>

                      </div>


                      <div class="row ">
                        <div className="col-md-4 ml-3">
                          <div class="custom-control custom-switch " >
                            <Form.Check
                              onChange={comprobarseleccion}
                              type="switch"
                              label="SUBAREA"
                              id="subarea"
                            />

                          </div>
                        </div>


                      </div>
                    </div>


                  </div>
                </div>
                {/* <div className=""> */}
                <div className="row d-flex justify-content-center " style={{ margin: "15px" }} >
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btnActivity btn w-75 btn-outline-primary btn-block"
                    >
                      <i className="fas fa-save"></i>&nbsp; Guardar Proyecto
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link
                      to="/proyecto"
                      type="submit"
                      className="btnActivity btn w-75 btn-outline-danger btn-block"
                    >
                      <IoArrowBackOutline /> Regresar
                    </Link>
                  </div>
                  {/* </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      {/* </div> */}
    </div>
  );
};


export default CreateProyecto;
const formatDate = (date) => {

  const fecha = date;  // string con la fecha en formato YYYY-MM-DD
  const parts = fecha.split("-");
  const fechaObjeto = parts[2] + "/" + parts[1] + "/" + parts[0];
  
  return fechaObjeto + "T00:00:00";

}

const DecodeformatDate = (date) => {
  

  const fecha = date.split(" ");// string con la fecha en formato YYYY-MM-DD
  const parts = fecha[0].split("/");

  const fechaObjeto = parts[2] + "-" + parts[1] + "-" + parts[0] + "T00:00:00";
  return fechaObjeto;

}


