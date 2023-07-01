import React, { createContext, useState, useEffect } from "react";
import { ActividadService } from "../services/ActividadService";
import { useFetcher } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

export const ActividadContext = createContext();

const ActividadContextProvider = (props) => {
    const token = localStorage.getItem("accessToken");
    const noCia = localStorage.getItem("NO_CIA");
    const actividadService = new ActividadService();

    const [actividades, setActividades] = useState([]);
    

    const [editActividad, setEditActividad] = useState(null)

    
    const [resultDelete, setResultDelete] = useState(null)

   

    //llee todos los datos de actividad
  
    useEffect(() => {
        const API_ACTIVIDAD = async (accessToken) => {
          try {
            const url = `${axios.getUri()}/api/ACTIVIDAD/Select/${noCia}`;
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            setActividades(data);
            
           
          } catch (error) {
            
          }
        };
        API_ACTIVIDAD(token);
      }, []);
    

    //constante para crear actividad
    const createActividad = (actividad) => {
        actividadService.
            create(actividad).
            then((data) => setActividad([...actividad, data]))

    };

    //elimina la actividad por ID
   

     
            const deleteActividad = async (id) => {
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
                      axios.delete(`/api/ACTIVIDAD/${id}`, {headers: { Authorization: `Bearer ${token}` }})
                        .then(function (response) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Registro Eliminado!',
                            showConfirmButton: false,
                            timer: 1500,
              
                          })
                          setActividades(actividades.filter((item) => item.ID !== id))
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
            
            

            
  

    //selecciona una actividad por Id
    const findActividad = (id) => {
        const Actividad = actividades.find((p) => p.ID == id);
        setEditActividad(actividad)
    };

    //actualizar actividad
    const updateActividad = (actividad) => {
        actividadService.
            update(actividad).
            then((data) => setActividad(actividad.map((a) => a.ID === actividad.ID ? data : actividad)))
        setEditActividad(null);
    };


    return (
<ActividadContext.Provider
 value={{
    createActividad,
    deleteActividad,
    findActividad,
    updateActividad,
    editActividad,
    resultDelete,
    actividades,
   

}}
>
{props.children}
   
</ActividadContext.Provider>
    );
}

export default ActividadContextProvider;