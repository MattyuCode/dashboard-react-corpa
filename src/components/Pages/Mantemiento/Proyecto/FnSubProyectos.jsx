import React, { useState } from 'react'

import Swal from 'sweetalert2'
import axios from 'axios';

export default GetSubproyectos = () => {
    let token = localStorage.getItem("accessToken");

    const Token = {
        headers: { Authorization: `Bearer ${token}` }
    };
   
    const [projectList, setProjectList] = useState([])
    async function SaveProyect() {
        var nocia = "10"


        axios.get(`/api/SUBPROYECTO/Select/${nocia}`, Token)
            .then(function (response) {
                debugger;
                setProjectList(response.data[0]["DESCRIPCION"]),
                
                    Swal.fire({

                        icon: 'success',
                        title: response.data[0]["DESCRIPCION"],
                        showConfirmButton: false,
                        timer: 1500
                    })
                setIsSaving(false);

                console.log(projectList);
            })
            .catch(function (error) {

                Swal.fire({
                    icon: 'error',
                    title: error.request["status"],
                    showConfirmButton: false,
                    timer: 2000
                })

            });


    }
    return setProjectList;
}