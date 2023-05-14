import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import "./CreateProyecto.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";

const CreateSubProyecto = () => {
    // const [isOpen, setIsOpen] = useState(false);
    // const toggleDropdown = () => setIsOpen(!isOpen);
    const [redirect, setRedirect] = useState(false);


    var { ID, IDSUBPROYECTO, OPERACION } = useParams();


    const usenavigate = useNavigate();

    var [fechainicio, setFechaInicio] = useState('');
    var [fechafin, setFechaFin] = useState('')
    var [nombre, setNombre] = useState('')
    var [descripcion, setDescripcion] = useState('')
    var [usuariocrea, setUsuarioCrea] = useState('')
    var [estado, setEstado] = useState('')
    var [isSaving, setIsSaving] = useState(false)
    let token = localStorage.getItem("accessToken");
    let des = descripcion;

    const Token = {
        headers: { Authorization: `Bearer ${token}` }
    };

    //ACTUALIZAR PROYECTO
    if ( OPERACION==1) {

        const API_SUBPROYECTO = async (accessToken) => {
            try {
                const url =
                    `${axios.getUri()}/api/SUBPROYECTO/SelectId/${localStorage.getItem("NO_CIA")}/${IDSUBPROYECTO}`;
debugger;
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = await response.json();
                document.getElementById("descripcion").value = data[0]["DESCRIPCION"];
                document.getElementById("nombre").value = data[0]["NOMBRE"];
                document.getElementById("fechainicio").value = DecodeformatDate(data[0]["FECHA_INICIO"]);
                document.getElementById("fechafin").value = DecodeformatDate(data[0]["FECHA_FIN"]);
                //  setDescripcion(data[0]["DESCRIPCION"]);

               
                setEstado(data[0]["ESTADO"]);

            } catch (error) {
                console.log(error);
            }
        };
        API_SUBPROYECTO(token);





    }








    async function SaveProyect() {

        if ( OPERACION==0 ) {


            
                setIsSaving(true);
                nombre = document.getElementById("nombre").value;
                descripcion = document.getElementById("descripcion").value;
                fechainicio = document.getElementById("fechainicio").value;
                fechafin = document.getElementById("fechafin").value;

                axios.post('/api/SUBPROYECTO/Insert', {
                    nO_CIA: localStorage.getItem("NO_CIA"),
                    id_proyecto:ID,
                    nombre: nombre,
                    descripcion: descripcion,
                    fecha_inicio: formatDate(fechainicio),
                    fecha_fin: formatDate(fechafin),
                    estado: "A"

                }, Token)
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
                        return usenavigate("/DetailsProyect/"+ID);
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
            
        } else {

            setIsSaving(true);
            descripcion = document.getElementById("descripcion").value;
            nombre = document.getElementById("nombre").value;
            fechainicio = document.getElementById("fechainicio").value;
            fechafin = document.getElementById("fechafin").value;
            debugger;
            axios.put(`/api/SUBPROYECTO/${IDSUBPROYECTO}`, {
                nO_CIA: localStorage.getItem("NO_CIA"),
                id:IDSUBPROYECTO,
                id_proyecto:ID,
                nombre: nombre,
                descripcion: descripcion,
                fecha_inicio: formatDate(fechainicio),
                fecha_fin: formatDate(fechafin),
                estado: "A"

            }, Token)
                .then(await function (response) {

                    Swal.fire({
                        icon: 'success',
                        title: response.data["msg"],
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsSaving(false);

                    return usenavigate("/DetailsProyect/"+ID);
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
        descripcion = document.getElementById("descripcion").value;
        nombre = document.getElementById("nombre").value;
        fechainicio = document.getElementById("fechainicio").value;
        fechafin = document.getElementById("fechafin").value;
        let result = true;
        if (
            !fechainicio.trim() ||
            !fechafin.trim() ||
            !nombre.trim() ||
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
            document.getElementById("nombre").classList.remove("is-invalid");
            document.getElementById("nombre").classList.add("is-valid");

        } else {

            SaveProyect();
            document.getElementById("fechainicio").classList.remove("is-invalid");
            document.getElementById("fechainicio").classList.add("is-valid");

            document.getElementById("fechafin").classList.remove("is-invalid");
            document.getElementById("fechafin").classList.add("is-valid");

            document.getElementById("descripcion").classList.remove("is-invalid");
            document.getElementById("descripcion").classList.add("is-valid");

            document.getElementById("nombre").classList.remove("is-invalid");
            document.getElementById("nombre").classList.add("is-valid");
        }
        return result;
    };

    return (
        <div className="container mt-4  contCreateActivi">
            <div className="row rowALl">
                <div className="col-md-12">

                    <span className="text-center titless " style={{}}>
                        SUBPROYECTO
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
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">NOMBRE</label>
                                            <input
                                                type="input"
                                                id="nombre"
                                                className="form-control"
                                                name="nombre"

                                            />
                                        </div>

                                    </div>
                                    <div className="col-md-6 mb-5">
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
                                            <i className="fas fa-save"></i>&nbsp; Guardar SubProyecto
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

export default CreateSubProyecto;
const formatDate = (date) => {

    const fecha = date;  // string con la fecha en formato YYYY-MM-DD
    const parts = fecha.split("-");
    const fechaObjeto = parts[2] + "/" + parts[1] + "/" + parts[0];
    return fechaObjeto;

}

const DecodeformatDate = (date) => {
   

    const fecha = date.split(" ");// string con la fecha en formato YYYY-MM-DD
    const parts = fecha[0].split("/");

    const fechaObjeto = parts[2] + "-" + parts[1] + "-" + parts[0];
    return fechaObjeto;

}

