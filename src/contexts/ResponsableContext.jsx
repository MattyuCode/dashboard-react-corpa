import React from "react";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { TokenANDnoCia } from "../components/Utilities/TokenANDnoCia";



export const ResponsableContext = () => {

    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const { noCia, token } = TokenANDnoCia();
   

    useEffect(() => {
        const GET_EMPLEADOS = async () => {
            
            try {
                const url =
                    `${axios.getUri()}/api/RESPONSABLE/GetResponsables/${noCia}`;

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setEmpleados(data);


            } catch (error) {
                
            }
        };
        GET_EMPLEADOS();
    }, [noCia, token]);



    useEffect(() => {
        const GET_USUARIOS = async () => {
            try {
                const url =
                    `${axios.getUri()}/api/RESPONSABLE/SelectUsuarios/${noCia}`;

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
               
                setUsuarios(data);
               
            } catch (error) {
                
            }
        };
        GET_USUARIOS();
    }, [noCia, token]);


    useEffect(() => {
        const GET_RESPONSABLES = async () => {
            try {
                const url =
                    `${axios.getUri()}/api/RESPONSABLE/SelectAllResponsable/${noCia}`;

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
               
                setResponsables(data);
               
            } catch (error) {
                
            }
        };
        GET_RESPONSABLES();
    }, [noCia, token]);



    const CREATE_RESPONSABLE = async (NOEMPLE, NOMBRE, USUARIO) => {
      debugger
        axios.post('/api/RESPONSABLE/Insert', {
            NO_CIA:noCia ,
            CODIGO_EMPLEADO: NOEMPLE,
            NOMBRE: NOMBRE,
            USUARIO: USUARIO


        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        
            .then(await function (response) {

                Swal.fire({
                    icon: 'success',
                    title: response.data["msg"],
                    showConfirmButton: false,
                    timer: 1500
                })
      
                window.location.reload();
                
            })
            .catch(await function (error) {

                Swal.fire({
                    icon: 'error',
                    title: error.request["status"],
                    showConfirmButton: false,
                    timer: 2000
                })

            });
           
    };


    const deleteResponsable = async (id) => {
        debugger
        Swal.fire({
            title: 'Desea Eliminar el Registro?',
            text: "Esta Accion no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
           
            if (result.isConfirmed) {
              axios.delete(`/api/RESPONSABLE/${id}`, {headers: { Authorization: `Bearer ${token}` }})
                .then(function (response) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Registro Eliminado!',
                    showConfirmButton: false,
                    timer: 1500,
      
                  })
                  setResponsables(responsables.filter((item) => item.NO_EMPLE !== id))
                },)
                .catch(function (error) {
                  if (error.request["status"] == 404) {
                    
                    Swal.fire({
                      icon: 'error',
                      title: "No espoble eliminar este registro porque contiene dependencias",
                      showConfirmButton: false,
                      timer: 3000
                    })
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: error.request["status"],
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
      
                });
            }
          })
    };


    
 
  return { empleados, usuarios, CREATE_RESPONSABLE,responsables,deleteResponsable};
};
