import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import "./CreateProyecto.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";
const CreateProyecto = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () => setIsOpen(!isOpen);
  const [redirect, setRedirect] = useState(false);

  
  var { ID } = useParams();
  
  
  const usenavigate = useNavigate();
  
  var [fechainicio, setFechaInicio] = useState('');
  var [fechafin, setFechaFin] = useState('')
  var [descripcion, setDescripcion] = useState('')
  var [usuariocrea, setUsuarioCrea] = useState('')
  var [estado, setEstado] = useState('')
  var [isSaving, setIsSaving] = useState(false)
  let token=localStorage.getItem("accessToken");
  let des=descripcion;
  
  const Token = {
    headers: { Authorization: `Bearer ${token}` }
};

//ACTUALIZAR PROYECTO
if(ID!=0){
  
    const API_SUBPROYECTO = async (accessToken) => {
      try {
        const url =
          `${axios.getUri()}/api/PROYECTO/Select/${localStorage.getItem("NO_CIA")}/${ID}`;

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        document.getElementById("descripcion").value=data[0]["DESCRIPCION"];
        document.getElementById("fechainicio").value=DecodeformatDate(data[0]["INICIO"]);
        document.getElementById("fechafin").value=DecodeformatDate(data[0]["FIN"]);
      //  setDescripcion(data[0]["DESCRIPCION"]);
        
        setUsuarioCrea(data[0]["USUARIO_CREA"]);
        setEstado(data[0]["ESTADO"]);
        
      } catch (error) {
        console.log(error);
      }
    };
    API_SUBPROYECTO(token);

  

 

}








  async function SaveProyect () {
    
    if(ID<1){

    
if(fechainicio.length!=0 && fechafin.length!=0 && descripcion.length!=0){
    setIsSaving(true);
    descripcion= document.getElementById("descripcion").value;
    fechainicio=document.getElementById("fechainicio").value;
    fechafin=document.getElementById("fechafin").value;

    axios.post('/api/PROYECTO/Insert', {
      nO_CIA: localStorage.getItem("NO_CIA"),
      descripcion: descripcion,
      inicio: formatDate(fechainicio),
      fin: formatDate(fechafin),
      usuariO_CREA: localStorage.getItem("USERS"),
      estado: "A"
     
    },Token)
      .then(await function (response) {
        
          Swal.fire({
          icon: 'success',
          title: response.data["msg"],
          showConfirmButton: false,
          timer: 1500
        })
        setIsSaving(false);

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
        setIsSaving(false)
      });
    }
  }else{

    setIsSaving(true);
    descripcion= document.getElementById("descripcion").value;
    fechainicio=document.getElementById("fechainicio").value;
    fechafin=document.getElementById("fechafin").value;

    axios.put(`/api/PROYECTO/${ID}`, {
      nO_CIA: localStorage.getItem("NO_CIA"),
      descripcion: descripcion,
      inicio: formatDate(fechainicio),
      fin: formatDate(fechafin),
      usuario_crea: usuariocrea,
      estado: estado
     
    },Token)
      .then(await function (response) {
        
          Swal.fire({
          icon: 'success',
          title: response.data["msg"],
          showConfirmButton: false,
          timer: 1500
        })
        setIsSaving(false);

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
        setIsSaving(false)
      });

    
  }
  }

  

 
  if (redirect) {
    return usenavigate("/proyecto");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    descripcion= document.getElementById("descripcion").value;
    fechainicio=document.getElementById("fechainicio").value;
    fechafin=document.getElementById("fechafin").value;
    let result = true;
    if (
      !fechainicio.trim() ||
      !fechafin.trim() ||
      !descripcion.trim() 
    ) {
      result = false;
      console.log("NO hay datos ");
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });
      document.getElementById("fechainicio").classList.remove("is-invalid");
      document.getElementById("fechainicio").classList.add("is-valid");

      document.getElementById("fechafin").classList.remove("is-invalid");
      document.getElementById("fechafin").classList.add("is-valid");

      document.getElementById("descripcion").classList.remove("is-invalid");
      document.getElementById("descripcion").classList.add("is-valid");
      
    } else {
      
      SaveProyect ();
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
    <div className="container mt-4  contCreateActivi">
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
              <form onSubmit={handleInputChange}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA INICIO</label>
                      <input
                        type="date"
                        id="fechainicio"
                        className="form-control"
                        name="nombre"
                       
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA fin</label>
                      <input
                        type="date"
                        id="fechafin"
                        className="form-control"
                        name="fechafin"
                        
                      />
                    </div>
                    
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-12 mb-5">
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

                {/* <div className=""> */}
                <div className="row d-flex justify-content-center">
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btnActivity btn w-75 btn-outline-primary btn-block"
                    >
                      <i className="fas fa-save"></i>&nbsp; Guardar Actividad
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
  return fechaObjeto;

}

const DecodeformatDate = (date) => {
  debugger;
  
  const fecha = date.split(" ");// string con la fecha en formato YYYY-MM-DD
  const parts = fecha[0].split("/");
  
  const fechaObjeto = parts[2] + "-" + parts[1] + "-" + parts[0];
  return fechaObjeto;

}

