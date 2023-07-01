import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
//import "./CreateProyecto.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";
const DetailsSubArea = () => {

    const [redirect, setRedirect] = useState(false);
    const [ListArea, setArea] = useState([]);

    var { ID } = useParams();
    const usenavigate = useNavigate();
    var [descripcion, setDescripcion] = useState('');
    var [nombre, setNombre] = useState('');
    var [isSaving, setIsSaving] = useState(false);
    let token = localStorage.getItem("accessToken");
    var [IdArea, setIdArea] = useState();
    var [IdSubarea, setIdSubArea] = useState();

    const Token = {
        headers: { Authorization: `Bearer ${token}` }
    };


   
    
    //ACTUALIZAR PROYECTO
    if (ID != 0) {

        
        const API_SUBAREA= async (accessToken) => {
            try {
                const url =
                `${axios.getUri()}/api/SUBAREA/Select/${localStorage.getItem("NO_CIA")}/${ID}`;
      
              const response = await fetch(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
              const data = await response.json();
              
              document.getElementById("descripcion").value = data[0]["DESCRIPCION"];
              document.getElementById("nombre").value = data[0]["NOMBRE"];
              
           
               
             document.getElementById("descripcion").value = data[0]["DESCRIPCION"];
            } catch (error) {
            
            }
          };
          API_SUBAREA(token);

      

    
        const API_AREA = async (accessToken) => {
            try {
                const url =
                    `${axios.getUri()}/api/AREA/SelectId/${localStorage.getItem("NO_CIA")}/${ID}`;
    
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = await response.json();
               
                document.getElementById("area").value = data[0]["NOMBRE"];
            } catch (error) {
                
            }
          
           
        };
        API_AREA(token);
    }








    

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
                            


                                <div className="row">
                                    <div className="col-md-6 mb-6">
                                        <div className="form-outline">
                                            <label className="form-label">NOMBRE</label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                className="form-control"
                                                name="nombre"

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-6">
                                        <div className="form-outline">
                                            <label className="form-label">AREA</label>
                                            <input
                                                type="text"
                                                id="area"
                                                className="form-control"
                                                name="area"

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
                                        <Link
                                            to="/SubArea"
                                            type="submit"
                                            className="btnActivity btn w-75 btn-outline-danger btn-block"
                                        >
                                            <IoArrowBackOutline /> Regresar
                                        </Link>
                                    </div>
                                    {/* </div> */}
                                </div>
                            
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            {/* </div> */}
        </div>
    );
};

export default DetailsSubArea;

