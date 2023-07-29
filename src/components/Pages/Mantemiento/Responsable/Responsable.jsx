import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ResponsableContext } from "../../../../contexts/ResponsableContext";
import Select from "react-select";
import ResponsableList from "./ResponsableList";

import { Checkbox } from 'primereact/checkbox';
import { Alert } from "bootstrap";
import styled from "styled-components";
import jQuery from "jquery";


const Responsable = () => {
    const handleInputChange = (e) => {
        e.preventDefault();
    }

    const [selectIdEmpleado, setSelectIdEmpleado] = useState(null)
    const [selectUsuario, setSelectUsuario] = useState(null)
    const { empleados, usuarios, CREATE_RESPONSABLE, responsables } = ResponsableContext();
    const [idEmpleado, setIdEmpleado] = useState(null);
    const [NombreEmpleado, setNombreEmpleado] = useState(null)

    const [checked, setChecked] = useState(false);


    const ListEmpleado = empleados.map((EMPLEADO) => {

        return {
            value: EMPLEADO.CODIGO_EMPLEADO,
            label: EMPLEADO.NOMBRE
        }
    }
    );

    const GETIDEMPLEADO = (EMPLEADOSELECCIONADO) => {
        setSelectIdEmpleado(EMPLEADOSELECCIONADO)



    }

    const ListUsuarios = usuarios.map((USUARIO) => {

        return {
            value: USUARIO.IDUSUARIO,
            label: USUARIO.IDUSUARIO + "-->" + USUARIO.NOMBRE
        }
    }
    );

    const HABILITAMANUAL = (event) => {
        setChecked(event.target.checked)
       
        if (event.target.checked) {

            document.getElementById("mostrarformulario2").style.display = "block"
            document.getElementById("mostrarformulario1").style.display = "none"

        }
        if (event.target.checked == false) {

            document.getElementById("mostrarformulario1").style.display = "block"
            document.getElementById("mostrarformulario2").style.display = "none"

        }

    }
    const GETIDUSUARIO = (USUARIOSELECCIONADO) => {
        setSelectUsuario(USUARIOSELECCIONADO)

    }
    const GuarRegistro = () => {
        let USUARIO = selectUsuario == null ? "" : selectUsuario.value
        CREATE_RESPONSABLE(selectIdEmpleado.value, selectIdEmpleado.label, USUARIO)
        
    }
    const GuarRegistroManual = () => {
        let USUARIO = selectUsuario == null ? "" : selectUsuario.value

        CREATE_RESPONSABLE(idEmpleado, NombreEmpleado, USUARIO)
       
    }


    return (

        <div className="container mt-4  contCreateActivi border">

            <div className="row rowALl">
                <div className="col-md-12">

                    <span className="text-center titless " >
                        Responsables
                    </span>
                </div>

                <div className="col-md-12">
                    <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
                        <div className="container mt-4  border">
                            <div className="row  ">
                                {/* <div className="card-body py-5 px-md-5"> */}
                                <form onSubmit={handleInputChange} autoComplete="off">


                                    <div className="row">
                                        <div className="col-md-2 mr-2 mb-4 " >
                                           
                                            <label > <span class="badge badge-success" style={{ height: "20px", fontSize: "12px" }}>Habilitar Ingreso Manual</span>
                                                <div className=" justify-content-center ml-5">
                                                    <Checkbox onChange={HABILITAMANUAL} checked={checked}></Checkbox>
                                                </div>
                                            </label>

                                        </div>

                                    </div>


                                    <div id="mostrarformulario1" style={{ visibility: "visible", marginLeft: "10%" }}>
                                        <div className="row">
                                            <div className="col-md-8 mb-4 mt-3 ml-10">
                                                <div className="form-outline">

                                                    <Select
                                                        defaultValue={{ label: 'BÚSQUEDA POR  EMPLEADO', value: 'empty' }}
                                                        options={ListEmpleado}
                                                        onChange={
                                                            GETIDEMPLEADO
                                                        }

                                                    />

                                                </div>

                                            </div>

                                            <div className="col-md-2 mr-2 mt-3 " >
                                                <button type="button" onClick={GuarRegistro} class="btn btn-success">Guardar</button>

                                            </div>
                                        </div>

                                    </div>

                                    <div id="mostrarformulario2" style={{ display: "none", marginLeft: "10%" }}>
                                        <div className="row">
                                            <div className="col-md-4 mb-1">
                                                <div className="form-outline">
                                                    <label className="form-label">CÓDIGO</label>
                                                    <input
                                                        type="text"
                                                        id="descripcion"
                                                        className="form-control"
                                                        name="descripcion"
                                                        value={idEmpleado}
                                                        onChange={(e) => setIdEmpleado(e.target.value)}

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-5 mb-1">
                                                <div className="form-outline">
                                                    <label className="form-label">NOMBRE</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={NombreEmpleado}
                                                        onChange={(e) => setNombreEmpleado(e.target.value)}

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 mt-5">
                                                <div className="form-outline">

                                                    <button type="button" onClick={GuarRegistroManual} class="btn btn-success">Guardar</button>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-4 mt-3">

                                        </div>




                                    </div>

                                    <div className="col-md-7 mb-4 mt-3" style={{marginLeft:"10%"}} >
                                        <div className="form-outline">

                                            <Select
                                                defaultValue={{ label: 'BÚSQUEDA DE USUARIOS', value: 'empty' }}
                                                options={ListUsuarios}
                                                onChange={
                                                    GETIDUSUARIO
                                                }

                                            />

                                        </div>

                                    </div>



                                </form>

                            </div>
                        </div>
                        {<ResponsableList></ResponsableList>}

                    </div>

                </div>
                <ToastContainer />
            </div>

        </div>
    );
}

export default Responsable;
 