import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { API_Services } from "../../../../Config/APIService";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import axios from 'axios';
import Select from "react-select";
const EditParte = () => {


  const { ID } = useParams();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });
  const { noCia, token } = TokenANDnoCia();
  const usenavigate = useNavigate();



  const [proyecto, setProyecto] = useState([]);
  const [selectedIdProyecto, setSelectedIdProyecto] = useState("");

  const [subproyecto, setSubProyecto] = useState([]);
  const [selectedIdSubProyecto, setSelectedIdSubProyecto] = useState("");

  const [area, setArea] = useState([]);
  const [selectedIdArea, setSelectedIdArea] = useState("");

  const [subArea, setSubArea] = useState([]);
  const [selectedIdSubArea, setSelectedIdSubArea] = useState("");

  const [Equipo, setEquipo] = useState([]);
  const [selectedIdEquipo, setSelectedIdEquipo] = useState("");


  useEffect(() => {
    const fetchApiProyecto = async () => {
      try {
        const url =
          `${axios.getUri()}/api/PROYECTO/Select/${noCia}`;

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProyecto(data);
      } catch (error) {
        
      }
    };
    fetchApiProyecto();
  }, [noCia, token]);




  async function fetchApiSubProyecto(idproyecto) {
    try {
      const response = await fetch(
        `${API_Services}/SUBPROYECTO/Select/${noCia}/${idproyecto}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setSubProyecto(data);
    } catch (error) {
     
    }
  };

  async function fetchApiArea(idsubproyecto) {
    try {
      const response = await fetch(
        `${API_Services}/AREA/SelectIdSubProyecto/${noCia}/${idsubproyecto}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setArea(data);
    } catch (error) {
      
    }
  };


  async function fetchApiSubArea(idarea) {
    try {
      const response = await fetch(
        `${API_Services}/SUBAREA/SelectIdArea/${noCia}/${idarea}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setSubArea(data);
    } catch (error) {
      
    }
  };

  async function fetchApiEquipo(idsubarea) {
    try {
      const response = await fetch(
        `${API_Services}/EQUIPO/SelectIdSubarea/${noCia}/${idsubarea}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setEquipo(data);
    } catch (error) {
      
    }
  };



  useEffect(() => {


    const fetApiParte = async () => {
      try {
        const response = await fetch(
          `${API_Services}/PARTE/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
       
        setForm({
          nombre: data[0].NOMBRE_PARTE,
          descripcion: data[0].DESCRIPCION_PARTE,
        });
        setSelectedIdProyecto(data[0].ID_PROYECTO)
        fetchApiSubProyecto(data[0].ID_PROYECTO)
        setSelectedIdSubProyecto(data[0].ID_PROYECTO)
        fetchApiArea(data[0].ID_SUBPROYECTO)
        setSelectedIdArea(data[0].ID_AREA)
        fetchApiSubArea(data[0].ID_AREA)
        setSelectedIdSubArea(data[0].ID_SUBAREA)
        fetchApiEquipo(data[0].ID_SUBAREA)
        setSelectedIdEquipo(data[0].ID_EQUIPO);
      } catch (error) {
        
      }
    };


    fetApiParte();
  }, [ID, noCia, token]);






  //sirve para recorrer el arreglo y formar las opciones  del input select
  const ListProyecto = proyecto.map((proyecto) => {

    return {
      value: proyecto.ID,
      label: proyecto.NOMBRE
    }
  }
  );
  const selectedOptionProyecto = ListProyecto.find(proyecto => proyecto.value == selectedIdProyecto);

  const GETIDPROYECTO = ({ value }) => {
    setSelectedIdSubProyecto("")
    fetchApiSubProyecto(value);
    setSelectedIdProyecto(value)

  }

  const ListSubProyecto = subproyecto.map((subproyecto) => {

    return {
      value: subproyecto.ID,
      label: subproyecto.NOMBRE
    }
  }
  );

  const selectedOptionSubProyecto = ListSubProyecto.find(subproyecto => subproyecto.value == selectedIdSubProyecto);

  const GETIDSUBPROYECTO = ({ value }) => {
    setSelectedIdArea("")
    fetchApiArea(value);
    setSelectedIdSubProyecto(value)

  }

  const ListArea = area.map((AREA) => {

    return {
      value: AREA.ID,
      label: AREA.NOMBRE
    }
  }
  );

  const selectedOptionArea = ListArea.find(AREA => AREA.value == selectedIdArea);

  const GETIDAREA = ({ value }) => {
    setSelectedIdSubArea("")
    fetchApiSubArea(value);
    setSelectedIdArea(value)

  }
  const ListSubArea = subArea.map((SUBAREA) => {

    return {
      value: SUBAREA.ID,
      label: SUBAREA.NOMBRE
    }
  }
  );
  //selecciona la opción según el Id dela subarea que trae de la base de datos
  const selectedOptionSubArea = ListSubArea.find(subArea => subArea.value == selectedIdSubArea);

  //obtiene el ID DE LA OPCIO SELECCIONADA EN EL SELECT SUBTAREAS
  const GETIDSUBAREA = ({ value }) => {
    setSelectedIdSubArea("")
    fetchApiEquipo(value)
    setSelectedIdSubArea(value)

  }

  const ListEquipo = Equipo.map((EQUIPO) => {

    return {
      value: EQUIPO.ID,
      label: EQUIPO.NOMBRE
    }
  }
  );
  const selectedOptionEquipo = ListEquipo.find(equipo => equipo.value == selectedIdEquipo);


  const GETIDEQUIPO = ({ value }) => {
    setSelectedIdEquipo("")

    setSelectedIdEquipo(value)

  }







  const fetchAPIEditar = async (name, idpro, descr) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: `${ID}`,
        nombre: name,
        id_equipo: idpro,
        descripcion: descr,
        no_cia: `${noCia}`,
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/PARTE/${ID}`,
        requestOptions
      );
      const data = await response.json();
      
      Swal.fire({
        icon: "success",
        title: "Parte actualizada",
        text: "El Parte se ha actualizado exitosamente",
      }).then(() => {
        usenavigate("/parte");
      });
    } catch (error) {
      
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let inputNombre = form.nombre;
    let textAreaDescri = form.descripcion;
    let result = true;
    if (
      !inputNombre.trim() ||
      selectedIdSubProyecto === "" ||
      selectedIdArea === "" ||
      selectedIdSubArea === "" ||
      selectedIdEquipo == ""
    ) {
      result = false;
      
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });

      document.getElementById("nombreINP").classList.remove("is-valid");
      document.getElementById("nombreINP").classList.add("is-invalid");

      // document.getElementById("inputDes").classList.remove("is-valid");
      //document.getElementById("inputDes").classList.add("is-invalid");

      document.getElementById("selectIDO").classList.remove("is-valid");
      document.getElementById("selectIDO").classList.add("is-invalid");
    } else {
      fetchAPIEditar(form.nombre, selectedIdEquipo, form.descripcion);

      document.getElementById("nombreINP").classList.remove("is-invalid");
      document.getElementById("nombreINP").classList.add("is-valid");

      document.getElementById("inputDes").classList.remove("is-invalid");
      document.getElementById("inputDes").classList.add("is-valid");

      document.getElementById("selectIDO").classList.remove("is-invalid");
      document.getElementById("selectIDO").classList.add("is-valid");
      
      toast.success("El area se actualizo exitosamente", {
        theme: "colored",
      });
    }
    return result;
  };

  return (
    <div className="container  mt-4">
      <div className="row" style={{ padding: "0 5rem" }}>
        <div className="col-md-12">
          <span className="titless text-center">Editar Parte</span>
        </div>

        <div className="col-md-12 ">
          <div className=" shadow" style={{ padding: " 4rem" }}>
            <form onSubmit={handleInputChange}>

              <div className="row">

                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">PROYECTO</label>
                    <Select
                      defaultValue={{ label: 'SELECCIONAR PROYECTO', value: 'empty' }}
                      options={ListProyecto}
                      value={selectedOptionProyecto}
                      onChange={
                        GETIDPROYECTO
                      }
                      id="selectIDO"
                      name="idSubArea"
                      required=""
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">SUBPROYECTO</label>
                    <Select
                      defaultValue={{ label: 'SELECCIONAR SUBPROYECTO', value: 'empty' }}
                      options={ListSubProyecto}
                      value={selectedOptionSubProyecto}
                      onChange={
                        GETIDSUBPROYECTO
                      }
                      id="selectIDO"
                      name="idSubArea"
                    />
                  </div>
                </div>
              </div>


              <div className="row">

                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">AREA</label>
                    <Select
                      defaultValue={{ label: 'SELECCIONAR AREA', value: 'empty' }}
                      options={ListArea}
                      value={selectedOptionArea}
                      onChange={
                        GETIDAREA
                      }
                      id="selectIDO"
                      name="idSubArea"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">SUBAREA</label>
                    <Select
                      defaultValue={{ label: 'SELECCIONAR SUBAREA', value: 'empty' }}
                      options={ListSubArea}
                      value={selectedOptionSubArea}
                      onChange={
                        GETIDSUBAREA
                      }
                      id="selectIDO"
                      name="idSubArea"
                    />
                  </div>
                </div>
              </div>





              <div className="row">

                <div className="col-md-6 mb-4">
                  <label className="form-label">EQUIPO</label>
                  <Select
                    defaultValue={{ label: 'SELECCIONAR EQUIPO', value: 'empty' }}
                    options={ListEquipo}
                    value={selectedOptionEquipo}
                    onChange={
                      GETIDEQUIPO
                    }

                    name="idSubArea"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">NOMBRE</label>
                    <input
                      type="text"
                      id="nombreINP"
                      className="form-control"
                      name="nombre"
                      value={form.nombre}
                      onChange={(e) => {
                        setForm({ ...form, nombre: e.target.value });
                      }}
                    />
                  </div>
                </div>


              </div>

              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="form-outline">
                    <label className="form-label">DESCRIPCION</label>
                    <textarea
                      type="text"
                      id="inputDes"
                      className="form-control"
                      name="descripcion"
                      value={form.descripcion}
                      onChange={(e) => {
                        setForm({ ...form, descripcion: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-center">
                <div className="col-md-6 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btnActivity btn w-75 btn-outline-primary btn-block"
                  >
                    <i className="fas fa-save"></i>&nbsp; Guardar Cambios
                  </button>
                </div>
                <div className="col-md-6">
                  <Link
                    to="/parte"
                    type="submit"
                    className="btnActivity btn w-75 btn-outline-danger btn-block"
                  >
                    <IoArrowBackOutline /> Regresar
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditParte;
