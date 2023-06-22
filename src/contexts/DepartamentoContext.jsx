import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

export const DepartamentoContext = createContext();

const DepartamentoContextProvider = (props) => {
    const token = localStorage.getItem("accessToken");
    const noCia = localStorage.getItem("NO_CIA");
    
    const [departamentos, setDepartamentos] = useState([]);
    
    //llee todos los datos de departamento
  
    useEffect(() => {
        const API_DEPARTAMENTO = async () => {
          try {
            const url = `${axios.getUri()}/api/DEPARTAMENTO/SelectAll/${noCia}`;
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
     
            setDepartamentos(data);
           
          } catch (error) {
            console.log(error);
          }
        };
        API_DEPARTAMENTO();
      }, []);

     

      const UPDATE_PROYECTO=async (NO_CIA,FINCA,AREA,DEPA,IND_FINCA) =>{
       
      let check="";
      if(Boolean(IND_FINCA)){check="S"}else{check="N"}

        axios.put(`/api/DEPARTAMENTO`, {
          no_cia: NO_CIA,
          finca:FINCA,
          area:AREA,
          depa:DEPA,
          ind_proyectos:check
        
          },  {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(await function (response) {

            Swal.fire({
              icon: 'success',
              title: response.data["msg"],
              showConfirmButton: false,
              timer: 1500
            })
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
    

      
    return (
<DepartamentoContext.Provider
 value={{
   departamentos,
   setDepartamentos,
   UPDATE_PROYECTO,
  
}}
>
{props.children}
   
</DepartamentoContext.Provider>
    );
}

export default DepartamentoContextProvider;