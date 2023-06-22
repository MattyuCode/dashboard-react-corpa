import React, { createContext, useState, useEffect } from "react";
//import { ActividadService } from "../services/ActividadService";
import { useFetcher } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

export const ProyectoContext = createContext();

const ProyectoContextProvider = (props) => {
    const token = localStorage.getItem("accessToken");
    const noCia = localStorage.getItem("NO_CIA");
    //const actividadService = new ActividadService();

    const [proyectos, setProyectos] = useState([]);
    const [subproyectos, setSubProyectos] = useState([]);
    
    //llee todos los datos de actividad
  
    useEffect(() => {
        const API_PROYECTOS = async (accessToken) => {
          try {
            const url = `${axios.getUri()}/api/PROYECTO/Select/${noCia}`;
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            setProyectos(data);
           
          } catch (error) {
            console.log(error);
          }
        };
        API_PROYECTOS(token);
      }, []);
    

      const API_SUBPROYECTO = async (idProy) => {
        debugger
        try {
          const url =
            `${axios.getUri()}/api/SUBPROYECTO/Select/${localStorage.getItem("NO_CIA")}/${idProy}`;
    
          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setSubProyectos(data);
        } catch (error) {
          console.log(error);
        }
      };
   

    //elimina la etapa por ID

            const deleteProyectos = async (id) => {
                Swal.fire({
                    title: 'Desea Eliminar el Registro?',
                    text: "Esta Accion no se podrá revertir",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                  }).then((result) => {
                    debugger
                    if (result.isConfirmed) {
                      axios.delete(`/api/PROYECTO/${id}`, {headers: { Authorization: `Bearer ${token}` }})
                        .then(function (response) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Registro Eliminado!',
                            showConfirmButton: false,
                            timer: 1500,
              
                          })
                          setProyectos(proyectos.filter((item) => item.ID !== id))
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
            
            

    return (
<ProyectoContext.Provider
 value={{
    deleteProyectos,
    API_SUBPROYECTO,
    proyectos,
    subproyectos,
   

}}
>
{props.children}
   
</ProyectoContext.Provider>
    );
}

export default ProyectoContextProvider;