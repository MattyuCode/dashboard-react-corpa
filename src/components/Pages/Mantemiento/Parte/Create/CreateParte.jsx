import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { API_Services } from "../../../../Config/APIService";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import axios from 'axios';
import Select from "react-select";

const CreateParte = () => {

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


  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { noCia, token } = TokenANDnoCia();
  const usenavigate = useNavigate();





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


















  //sirve para recorrer el arreglo y formar las opciones  del input select
  const ListProyecto = proyecto.map((proyecto) => {

    return {
      value: proyecto.ID,
      label: proyecto.NOMBRE
    }
  }
  );

  const GETIDPROYECTO = ({ value }) => {

    setSelectedIdProyecto(value)
    fetchApiSubProyecto(value);


  }

  const ListSubProyecto = subproyecto.map((subproyecto) => {

    return {
      value: subproyecto.ID,
      label: subproyecto.NOMBRE
    }
  }
  );

  const GETIDSUBPROYECTO = ({ value }) => {

    setSelectedIdSubProyecto(value)
    fetchApiArea(value);


  }

  const ListArea = area.map((AREA) => {

    return {
      value: AREA.ID,
      label: AREA.NOMBRE
    }
  }
  );

  const GETIDAREA = ({ value }) => {
    setSelectedIdArea(value)
    fetchApiSubArea(value);


  }
  const ListSubArea = subArea.map((SUBAREA) => {

    return {
      value: SUBAREA.ID,
      label: SUBAREA.NOMBRE
    }
  }
  );
  //obtiene el ID DE LA OPCIO SELECCIONADA EN EL SELECT SUBTAREAS
  const GETIDSUBAREA = ({ value }) => {
    setSelectedIdSubArea(value)
    fetchApiEquipo(value)

  }

  const ListEquipo = Equipo.map((EQUIPO) => {

    return {
      value: EQUIPO.ID,
      label: EQUIPO.NOMBRE
    }
  }
  );

  const GETIDEQUIPO = ({ value }) => {
    setSelectedIdEquipo(value)


  }



  const guardarParte = async (name, idArea, descrip) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: name,
        id_equipo: idArea,
        descripcion: descrip,
        no_cia: `${noCia}`,
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/PARTE/Insert`,
        requestOptions
      );
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Parte guardada",
        text: "Parte guardado exitosamente",
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {
      
    }
  };

  if (redirect) {
    return usenavigate("/parte");
  }

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
      console.log("NO hay datos ");
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });
      document.getElementById("nombreINP").classList.remove("is-valid");
      document.getElementById("nombreINP").classList.add("is-invalid");

      //document.getElementById("inputDes").classList.remove("is-valid");
      // document.getElementById("inputDes").classList.add("is-invalid");

      document.getElementById("selectIDO").classList.remove("is-valid");
      document.getElementById("selectIDO").classList.add("is-invalid");
    } else {
      setForm({ ...form, idSubproyecto: selectedIdEquipo });
      guardarParte(form.nombre, selectedIdEquipo, form.descripcion);
      toast.success("Parte guardado exitosamente", {
        theme: "colored",
      });
      document.getElementById("nombreINP").classList.remove("is-invalid");
      document.getElementById("nombreINP").classList.add("is-valid");

      document.getElementById("inputDes").classList.remove("is-invalid");
      document.getElementById("inputDes").classList.add("is-valid");

      document.getElementById("selectIDO").classList.remove("is-invalid");
      document.getElementById("selectIDO").classList.add("is-valid");
    }
    return result;
  };

  return (
    <div className="container mt-4  contCreateActivi">
      <div className="row rowALl">
        <div className="col-md-12">
          <span className="text-center titless " style={{}}>
            Agregar  Parte
          </span>
        </div>

        <div className="col-md-12">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            <div className="row  ">
              <form onSubmit={handleInputChange}>

                <div className="row">

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">PROYECTO</label>
                      <Select
                        defaultValue={{ label: 'SELECCIONAR PROYECTO', value: 'empty' }}
                        options={ListProyecto}
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
                      <i className="fas fa-save"></i>&nbsp; Guardar Parte
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
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
    </div>
  );
};

export default CreateParte;
