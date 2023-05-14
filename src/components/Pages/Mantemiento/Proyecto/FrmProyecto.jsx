import React, { useState } from 'react'

import Swal from 'sweetalert2'
import axios from 'axios';






const FrmProyecto = () => {
 
  const [fechainicio, setFechaInicio] = useState('');
  const [fechafin, setFechaFin] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  let token=localStorage.getItem("accessToken");

  const Token = {
    headers: { Authorization: `Bearer ${token}` }
};

  async function SaveProyect () {
if(fechainicio.length!=0 && fechafin.length!=0 && descripcion.length!=0){
    setIsSaving(true);
    debugger;
    axios.post('/api/PROYECTO/Insert', {
      nO_CIA: localStorage.getItem("NO_CIA"),
      descripcion: descripcion,
      inicio: formatDate(fechainicio),
      fin: formatDate(fechafin),
      usuariO_CREA: localStorage.getItem("USERS"),
      estado: "A"
     
    },Token)
      .then(await function (response) {
        
          Swal.fire({
          icon: 'success',
          title: response.data["msg"],
          showConfirmButton: false,
          timer: 1500
        })
        setIsSaving(false);

        setDescripcion('')
      })
      .catch(await function (error) {
        
        Swal.fire({
          icon: 'error',
          title: error.request["status"],
          showConfirmButton: false,
          timer: 2000
        })
        setIsSaving(false)
      });
    }

  }


  
  

  return (
    

    <div className="tab-pane fade show active" id="tabBusqueda" role="tabpanel">
      <div id="divBusqueda">
        <div className="row">
          <div className="col-md-12 text-center">

            <div id="formulario1">


              <form action="" method=''>
                <div className="row">


                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Fecha Inicio</span>
                      <input onChange={(event) => { setFechaInicio(event.target.value) }} className="form-control" id="fechainicio" type="date" required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Fecha Fin</span>
                      <input onChange={(event) => { setFechaFin(event.target.value) }} className="form-control" name="fechafin" type="date" required />
                    </div>
                  </div>
                </div>




                <br />


                <div className="row">

                  <div className="col-md-6">
                    <div className="form-group">
                      <span>DESCRIPCION</span>

                      <textarea   onChange={(event) => { setDescripcion(event.target.value) }} className="form-control" id="descripcion" aria-label="With textarea" required></textarea>
                    </div>

                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <button type="submit"
                        disabled={isSaving}
                        onClick={SaveProyect} className="btn btn-success btn-lg">Guardar</button>
                    </div>
                  </div>

                  <div className="col-md-4">

                  </div>

                  <div className="col-md-4">

                  </div>
                </div>
              </form>
            </div>

            <br />
          </div>
        </div>
      </div>


    </div>
  );
}

export default FrmProyecto


const formatDate = (date) => {
  
  const fecha = date;  // string con la fecha en formato YYYY-MM-DD
  const parts = fecha.split("-");
  const fechaObjeto = parts[2] + "/" + parts[1] + "/" + parts[0];
  return fechaObjeto;

}
