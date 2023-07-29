

import { useState, useEffect } from "react";
import axios from 'axios';
import { TokenANDnoCia } from "../components/Utilities/TokenANDnoCia";





export const ReporteContext = () => {

    const [reporte, setReporte] = useState([]);
   
    const { noCia, token } = TokenANDnoCia();
   

    useEffect(() => {
        const GET_REPORTE = async () => {
            
            try {
                const url =
                    `${axios.getUri()}/api/TAREA/SelecDetalle_Tarea/${noCia}`;

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setReporte(data);


            } catch (error) {
               
            }
        };
        GET_REPORTE();
    }, [noCia, token]);



   





    

 
  return { reporte};
};
