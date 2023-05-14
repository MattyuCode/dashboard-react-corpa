import { useEffect, useState } from "react";

import Swal from 'sweetalert2'
import axios from 'axios';

const FrmSubProyecto = () => {
  const [ListSubproyect, setSubProyecto] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {

    const API_SUBPROYECTO = async (accessToken) => {
      try {
        const url =
          `${axios.getUri()}/api/PROYECTO/Select/${localStorage.getItem("NO_CIA")}`;

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setSubProyecto(data);
      } catch (error) {
        console.log(error);
      }
    };
    API_SUBPROYECTO(token);

  });


  const [idproyecto,setIdProyecto]=useState('');
  const [nombre,setNombre]=useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechainicio, setFechaInicio] = useState('');
  const [fechafin, setFechaFin] = useState('');
  const [isSaving, setIsSaving] = useState(false);


  const Token = {
    headers: { Authorization: `Bearer ${token}` }
  };

  

  async function SaveSubProyect () {
    if(fechainicio.length!=0 && fechafin.length!=0 && descripcion.length!=0 && idproyecto.length!=0){
    setIsSaving(true);
    debugger;
    axios.post('/api/SUBPROYECTO/Insert', {
      nO_CIA: localStorage.getItem("NO_CIA"),
      id_proyecto:idproyecto,
      nombre:nombre,
      descripcion: descripcion,
      fecha_inicio: formatDate(fechainicio),
      fecha_fin: formatDate(fechafin),
      estado: "A"

    }, Token)
      .then(await function (response) {
       
        Swal.fire({
          icon: 'success',
          title: response.data["msg"],
          showConfirmButton: false,
          timer: 1500
        })
        setIsSaving(false);
        setIdProyecto('');
        setNombre('');
        setFechaInicio('');
        setFechaFin('');
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
                  <div class="form-group">
                    <span>Proyecto</span>
                    <select onChange={(event) => { setIdProyecto(event.target.value) }} class="form-select"aria-label="Default select example" required>
                      <option selected value={""}>Seleccionar Proyecto</option>
                      {ListSubproyect.map((items) => (
                        <>
                          <option value={items.ID}>{items.DESCRIPCION}</option>
                        </>
                      ))}

                    </select>
                  </div>
                </div>


                <div className="col-md-6">
                  <div class="form-group">
                    <span>Nombre</span>
                    <input onChange={(event) => { setNombre(event.target.value) }} class="form-control" type="text" required />
                  </div>
                </div>
              </div>
          

            <br />


            <div className="row">


              <div className="col-md-6">
                <div class="form-group">
                  <span>Fecha Inicio</span>
                  <input onChange={(event) => { setFechaInicio(event.target.value) }}  class="form-control" type="date" required />
                </div>
              </div>

              <div className="col-md-6">
                <div class="form-group">
                  <span>Fecha Fin</span>
                  <input onChange={(event) => { setFechaFin(event.target.value) }}class="form-control" type="date" required />
                </div>
              </div>
            </div>

            <br />
            <div className="row">

              <div className="col-md-6">
                <div class="form-group">
                  <span>DESCRIPCION</span>

                  <textarea onChange={(event) => { setDescripcion(event.target.value) }} class="form-control" aria-label="With textarea" required></textarea>
                </div>

              </div>

              <div className="col-md-4">
              <div className="form-group">
                      <button type="submit"
                        disabled={isSaving}
                        onClick={SaveSubProyect} className="btn btn-success btn-lg">Guardar</button>
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

export default FrmSubProyecto
const formatDate = (date) => {
  
  const fecha = date;  // string con la fecha en formato YYYY-MM-DD
  const parts = fecha.split("-");
  const fechaObjeto = parts[2] + "/" + parts[1] + "/" + parts[0];
  return fechaObjeto;

}
