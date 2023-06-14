import React, { createContext, useState, useEffect } from "react";
//import { ActividadService } from "../services/ActividadService";
import { useFetcher } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

export const EquipoContext = createContext();

const EquipoContextProvider = (props) => {
    const token = localStorage.getItem("accessToken");
    const noCia = localStorage.getItem("NO_CIA");
    //const actividadService = new ActividadService();

    const [equipos, setEquipos] = useState([]);
    
    //llee todos los datos de actividad
  
    useEffect(() => {
        const API_EQUIPO = async (accessToken) => {
          try {
            const url = `${axios.getUri()}/api/EQUIPO/Select/${noCia}`;
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            setEquipos(data);
           
          } catch (error) {
            console.log(error);
          }
        };
        API_EQUIPO(token);
      }, []);
    

   

    //elimina la etapa por ID

            const deleteEquipos = async (id) => {
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
                      axios.delete(`/api/EQUIPO/${id}`, {headers: { Authorization: `Bearer ${token}` }})
                        .then(function (response) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Registro Eliminado!',
                            showConfirmButton: false,
                            timer: 1500,
              
                          })
                          setEquipos(equipos.filter((item) => item.ID !== id))
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
<EquipoContext.Provider
 value={{
    deleteEquipos,
    equipos,
   

}}
>
{props.children}
   
</EquipoContext.Provider>
    );
}

export default EquipoContextProvider;