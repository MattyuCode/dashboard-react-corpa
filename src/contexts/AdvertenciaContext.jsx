import React, { createContext, useState, useEffect } from "react";
//import { ActividadService } from "../services/ActividadService";
import { useFetcher } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

export const AdvertenciaContext = createContext();

const AdvertenciaContextProvider = (props) => {
    const token = localStorage.getItem("accessToken");
    const noCia = localStorage.getItem("NO_CIA");
    //const actividadService = new ActividadService();

    const [advertencias, setAdvertencias] = useState([]);
    
    //llee todos los datos de actividad
  
    useEffect(() => {
        const API_ADVERTENCIA = async (accessToken) => {
          try {
            const url = `${axios.getUri()}/api/LUGARADVERTENCIA/Select/${noCia}`;
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            setAdvertencias(data);
           
          } catch (error) {
            console.log(error);
          }
        };
        API_ADVERTENCIA(token);
      }, []);
    

   

    //elimina la etapa por ID

            const deleteAdvertencias = async (id) => {
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
                      axios.delete(`/api/LUGARADVERTENCIA/${id}`, {headers: { Authorization: `Bearer ${token}` }})
                        .then(function (response) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Registro Eliminado!',
                            showConfirmButton: false,
                            timer: 1500,
              
                          })
                          setAdvertencias(advertencias.filter((item) => item.ID !== id))
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
<AdvertenciaContext.Provider
 value={{
    deleteAdvertencias,
    advertencias,
   

}}
>
{props.children}
   
</AdvertenciaContext.Provider>
    );
}

export default AdvertenciaContextProvider;