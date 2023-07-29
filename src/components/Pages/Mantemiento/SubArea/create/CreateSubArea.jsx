import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
//import "./CreateProyecto.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";
import $ from 'jquery';
const CreateSubArea = () => {

    const [redirect, setRedirect] = useState(false);
    const [ListArea, setArea] = useState([]);

    var { ID } = useParams();
    const usenavigate = useNavigate();
    var [descripcion, setDescripcion] = useState('');
    var [nombre, setNombre] = useState('');

    const noCia = localStorage.getItem("NO_CIA");
    let token = localStorage.getItem("accessToken");

    var [IdSubarea, setIdSubArea] = useState();

    const [Proyectos, setProyectos] = useState([]);
    const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState("");

    const [selectedIdArea, setSelectedIdArea] = useState("");
    const [selectNombreArea, setNombreArea] = useState("");
    const [selectedIdProyectos, setSelectedIdProyectos] = useState(0);

    const [isenabled, setIsenabled] = useState(false);
    const [subProyectos, setSubProyectos] = useState([]);
    var [isexecute, setisexecute] = useState(true);
    const Token = {
        headers: { Authorization: `Bearer ${token}` }
    };










    const API_SUBPROYECTO = async (accessToken, idsubproyecto) => {
        try {
            const url =
                `${axios.getUri()}/api/SUBPROYECTO/Select/${localStorage.getItem("NO_CIA")}/${idsubproyecto}`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            setSubProyectos(data);


        } catch (error) {
           
        }
    };



    function llenasubproyecto(idproyecto) {
        var IDPROYECTO
        idproyecto == "" ? IDPROYECTO = 0 : IDPROYECTO = idproyecto
        setSelectedIdProyectos(idproyecto)

        API_SUBPROYECTO(token, IDPROYECTO);
        let datos = Proyectos.filter((item) => item.ID == idproyecto)

        if (datos[0]["BLK_SUBAREA"] == 'S') {
            setIsenabled(true)
        } else {
            setIsenabled(false)
        }



    }

    const API_AREA = async (accessToken, IdSubProyecto) => {
        try {
            const url =
                `${axios.getUri()}/api/AREA/SelectIdSubProyecto/${localStorage.getItem("NO_CIA")}/${IdSubProyecto}`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();

            setArea(data);
        } catch (error) {
            
        }


    };


    const API_AREAPROYECTO = async (accessToken, IdProyecto) => {
        try {
            const url =
                `${axios.getUri()}/api/AREA/SelectIdProyecto/${localStorage.getItem("NO_CIA")}/${IdProyecto}`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();

            setArea(data);
        } catch (error) {
            
        }


    };


    function llenaArea(IdSubproyecto) {
        var IDSUBPROYECTO
        IdSubproyecto == "" ? IDSUBPROYECTO = 0 : IDSUBPROYECTO = IdSubproyecto
        setSelectedIdSubProyectos(IdSubproyecto)
        setSelectedIdArea("")

        API_AREA(token, IdSubproyecto);
    }

    function llenaAreaProyecto(IdProyecto) {
        
        var IDPROYECTO
        IdProyecto == "" ? IDPROYECTO = 0 : IDPROYECTO = IdProyecto
       // setSelectedIdSubProyectos(IdProyecto)
        setSelectedIdArea("")

        API_AREAPROYECTO(token, IdProyecto);
    }

    //ACTUALIZAR PROYECTO
    if (ID != 0) {


        const API_SUBAREA = async (accessToken) => {
            try {
                const url =
                    `${axios.getUri()}/api/SUBAREA/Select/${localStorage.getItem("NO_CIA")}/${ID}`;

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = await response.json();

                document.getElementById("descripcion").value = data[0]["DESCRIPCION"];
                document.getElementById("nombre").value = data[0]["NOMBRE"];

                setIdSubArea(data[0]["ID"])
                setSelectedIdArea(data[0]["ID_AREA"])
                
                $('#MOSTRAR').hide();
                $('#MOSTRAR1').hide()
                $('#MOSTRAR2').hide()
                setSelectedIdSubProyectos(1)
                setSelectedIdProyectos(1)



            } catch (error) {
                
            }
        };
        API_SUBAREA(token);



    } else {
        const API_PROYECTO = async (accessToken) => {
            try {
                const url =
                    `${axios.getUri()}/api/PROYECTO/Select/${localStorage.getItem("NO_CIA")}`;

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = await response.json();
                setProyectos(data);


            } catch (error) {
                
            }
        };
        if (isexecute) {
            API_PROYECTO(token);
            setisexecute(false)
        }
    }










    async function SaveSubArea() {
        if (ID < 1) {

            var IDSUBPROYECTO
            selectedIdSubProyectos == "" ? IDSUBPROYECTO = 0 : IDSUBPROYECTO = selectedIdSubProyectos


            descripcion = document.getElementById("descripcion").value;
            nombre = document.getElementById("nombre").value;

            axios.post('/api/SUBAREA/Insert', {
                IdProyecto: selectedIdProyectos,
                nO_CIA: localStorage.getItem("NO_CIA"),
                id_subproyecto: IDSUBPROYECTO,
                id_area:selectedIdArea,
                descripcion: descripcion,
                nombre: nombre,
                nombre_area:selectNombreArea


            }, Token)
                .then(await function (response) {

                    Swal.fire({
                        icon: 'success',
                        title: response.data["msg"],
                        showConfirmButton: false,
                        timer: 1500
                    })



                    return usenavigate("/subarea");
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


            descripcion = document.getElementById("descripcion").value;
            nombre = document.getElementById("nombre").value;

            
            axios.put(`/api/SUBAREA/${ID}`, {

                nO_CIA: localStorage.getItem("NO_CIA"),
                id_area: selectedIdArea,
                nombre: nombre,
                descripcion: descripcion,

            }, Token)
                .then(await function (response) {

                    Swal.fire({
                        icon: 'success',
                        title: response.data["msg"],
                        showConfirmButton: false,
                        timer: 1500
                    })



                    return usenavigate("/subarea");
                })
                .catch(await function (error) {

                    Swal.fire({
                        icon: 'error',
                        title: error.request["status"],
                        showConfirmButton: false,
                        timer: 2000
                    })

                });


        }
    }




    if (redirect) {
        return usenavigate("/SubArea");
    }

    const handleInputChange = (e) => {
        e.preventDefault();

        var IDSUBPROYECTO



        descripcion = document.getElementById("descripcion").value;
        nombre = document.getElementById("nombre").value;
        // IdArea = document.getElementById("area").value;

        if (isenabled) {
            selectedIdSubProyectos == "" ? IDSUBPROYECTO = 0 : IDSUBPROYECTO = selectedIdSubProyectos
        } else {
            IDSUBPROYECTO = selectedIdSubProyectos
        }

        let result = true;
        if (
            !nombre.trim() ||
           // !descripcion.trim() ||
            selectedIdArea === "" ||
            selectedIdProyectos === "" ||
            IDSUBPROYECTO === ""
        ) {
           
            result = false;
            
            toast.error("Todos los campos son obligatorios", {
                theme: "colored",
            });

            document.getElementById("nombre").classList.remove("is-valid");
            document.getElementById("nombre").classList.add("is-invalid");

           // document.getElementById("descripcion").classList.remove("is-valid");
           // document.getElementById("descripcion").classList.add("is-invalid");

            document.getElementById("area").classList.remove("is-valid");
            document.getElementById("area").classList.add("is-invalid");

            document.getElementById("selectIDO").classList.remove("is-valid");
            document.getElementById("selectIDO").classList.add("is-invalid");

            document.getElementById("selectIDP").classList.remove("is-valid");
            document.getElementById("selectIDP").classList.add("is-invalid");

        } else {
            if (ID == 0) {
            
                if (ListArea.length != 0) {
                    SaveSubArea();
                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'El Sub Proyecto selecionado no contiene  areas, Por Favor Agregar',

                    })
                }
            } else {
                SaveSubArea();
            }
            document.getElementById("nombre").classList.remove("is-invalid");
            document.getElementById("nombre").classList.add("is-valid");

            document.getElementById("descripcion").classList.remove("is-invalid");
            document.getElementById("descripcion").classList.add("is-valid");

            document.getElementById("area").classList.remove("is-invalid");
            document.getElementById("area").classList.add("is-valid");
        }
        return result;
    };

    return (
        <div className="container mt-4  contCreateActivi">
            <div className="row rowALl">
                <div className="col-md-12">

                    <span className="text-center titless ">
                        SUBAREA
                    </span>
                </div>

                <div className="col-md-12">
                    <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
                        <div className="row  ">
                            {/* <div className="card-body py-5 px-md-5"> */}
                            <form onSubmit={handleInputChange}>


                                <div className="row">

                                    <div className="col-md-6 mb-4" id="MOSTRAR">
                                        <label className="form-label">PROYECTO</label>
                                        <select
                                            className="form-select"
                                            defaultValue={0}
                                            id="selectIDP"
                                            name="idproyecto"
                                            value={selectedIdProyectos}
                                            onChange={(e) =>

                                                {
                                                    llenasubproyecto(e.target.value)
                                                    llenaAreaProyecto(e.target.value)
                                                }
                                            }
                                        >
                                            <option value="">Seleccionar Proyecto</option>
                                            {Proyectos.map((Proyecto) => (
                                                <option key={Proyecto.ID} select value={Proyecto.ID}>
                                                    {Proyecto.NOMBRE}

                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="col-md-6 mb-4" id="MOSTRAR1">
                                        <label className="form-label">SUBPROYECTO</label>
                                        <select
                                            className="form-select"
                                            disabled={isenabled}
                                            defaultValue={0}
                                            id="selectIDO"
                                            name="idSubproyecto"
                                            value={selectedIdSubProyectos}
                                            onChange={(e) =>
                                                llenaArea(e.target.value)
                                            }
                                        >
                                            <option value="">Seleccionar Sub Proyecto</option>
                                            {subProyectos.map((subproyecto) => (
                                                <option key={subproyecto.ID} value={subproyecto.ID}>
                                                    {subproyecto.NOMBRE}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="col-md-6 mb-6" id="MOSTRAR2">
                                        <div className="form-outline">
                                            <label className="form-label">AREA</label>
                                            <select name="area" id="area"
                                               
                                                value={selectedIdArea}
                                                onChange={(e) =>
                                                   { setSelectedIdArea(e.target.value)
                                                    let index = e.target.selectedIndex
                                                    setNombreArea(e.target.options[index].text)
                                                    
    
                                                    
                                                }
                                                    
                                                }
                                                class="form-select" aria-label="Default select example" required>
                                                <option value={"DEFAULT"} >Seleccionar Area</option>
                                                {ListArea.map((items) => (
                                                    <>
                                                        <option value={items.ID}>{items.NOMBRE}</option>
                                                    </>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>




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
                                            <i className="fas fa-save"></i>&nbsp; Guardar SubArea
                                        </button>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-center">
                                        <Link
                                            to="/subarea"
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

export default CreateSubArea;

