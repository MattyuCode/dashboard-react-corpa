import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "./CreateActividad.css";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import { API_Services } from "../../../../Config/APIService";


const CreateActividad = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () => setIsOpen(!isOpen);
  const [subProyectos, setSubProyectos] = useState([]);
  const [Proyectos, setProyectos] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState("");
  const [selectedIdProyectos, setSelectedIdProyectos] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    // idSubproyecto: "",
    descripcion: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { noCia, token } = TokenANDnoCia();
  const usenavigate = useNavigate();
  const [isenabled, setIsenabled] = useState(false);





  useEffect(() => {
    const fetchApiProyectos = async (accessToken) => {
      try {
        const response = await fetch(
          `${API_Services}/PROYECTO/Select/${noCia}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await response.json();
        setProyectos(data);
      } catch (error) {

      }
    };
    fetchApiProyectos(token);
  }, [noCia, token]);


  const fetchApiSubProyectos = async (accessToken, idproyecto) => {

    try {
      const response = await fetch(
        `${API_Services}/SUBPROYECTO/Select/${noCia}/${idproyecto}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      setSubProyectos(data);

    } catch (error) {

    }
  };

  function llenasubproyecto(idproyecto) {
    let datos = Proyectos.filter((item) => item.ID == idproyecto)
    setSelectedIdProyectos(idproyecto)
    setSelectedIdSubProyectos("")
    fetchApiSubProyectos(token, datos[0]["ID"]);
    if (datos[0]["BLK_ACTIVIDAD"] == 'S') {
      setIsenabled(true)
    } else {
      setIsenabled(false)
    }


  }



  const guardarActividad = async (name, idsubpro, descr) => {
    var IDSUBPROYECT
    idsubpro == "" ? IDSUBPROYECT = 0 : IDSUBPROYECT = idsubpro

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        IdProyecto: selectedIdProyectos,
        nombre: name,
        ID_SUBPROYECTO: IDSUBPROYECT,
        descripcion: descr,
        no_cia: `${noCia}`,
      }),

    };

    try {
      const response = await fetch(
        `${API_Services}/ACTIVIDAD/Insert`,
        requestOptions
      );
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Actividad guardada",
        text: "La actvidad se ha guardado exitosamente",
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {

    }
  };




  if (redirect) {
    return usenavigate("/actividad");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    var idsubproyecto

    if (isenabled) {
      selectedIdSubProyectos == "" ? idsubproyecto = 0 : idsubproyecto = selectedIdSubProyectos
    } else {
      idsubproyecto = selectedIdSubProyectos
    }

    let inputNombre = form.nombre;
    let textAreaDescri = form.descripcion;
    let result = true;

    if (
      !inputNombre.trim() ||
      selectedIdProyectos === "" ||
      idsubproyecto === ""

    ) {
      result = false;
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });
      document.getElementById("nombreINP").classList.remove("is-valid");
      document.getElementById("nombreINP").classList.add("is-invalid");

      //  document.getElementById("inputDes").classList.remove("is-valid");
      // document.getElementById("inputDes").classList.add("is-invalid");



      document.getElementById("selectIDO").classList.remove("is-valid");
      document.getElementById("selectIDO").classList.add("is-invalid");

      document.getElementById("selectIDP").classList.remove("is-valid");
      document.getElementById("selectIDP").classList.add("is-invalid");


    } else {

      if (subProyectos.length != 0) {
        setForm({ ...form, idSubproyecto: selectedIdSubProyectos });
        guardarActividad(form.nombre, selectedIdSubProyectos, form.descripcion);
        toast.success("Actividad guardado exitosamente", {
          theme: "colored",
        });
      } else {

        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'El Proyecto no contiene subproyectos, Por Favor Agregar',

        })

      }
      document.getElementById("nombreINP").classList.remove("is-invalid");
      document.getElementById("nombreINP").classList.add("is-valid");

      document.getElementById("inputDes").classList.remove("is-invalid");
      document.getElementById("inputDes").classList.add("is-valid");

      document.getElementById("selectIDO").classList.remove("is-invalid");
      document.getElementById("selectIDO").classList.add("is-valid");

      document.getElementById("selectIDP").classList.remove("is-invalid");
      document.getElementById("selectIDP").classList.add("is-valid");

    }
    return result;
  };

  return (
    <div className="container mt-4  contCreateActivi">
      <div className="row rowALl">
        <div className="col-md-12">
          <span className="text-center titless " style={{}}>
            Agregar una nueva actividad
          </span>
        </div>

        <div className="col-md-12">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            <div className="row  ">
              <form onSubmit={handleInputChange} autoComplete="off">
                <div className="row">

                  <div className="col-md-6 mb-4">
                    <label className="form-label">PROYECTO</label>
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      id="selectIDP"
                      name="idproyecto"

                      onChange={(e) =>

                        llenasubproyecto(e.target.value)
                      }
                    >
                      <option value="DEFAULT">Seleccionar Proyecto</option>
                      {Proyectos.map((Proyecto) => (
                        <option key={Proyecto.ID} select value={Proyecto.ID}>
                          {Proyecto.NOMBRE}

                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label">SUBPROYECTO</label>
                    <select
                      className="form-select"
                      defaultValue={0}
                      id="selectIDO"
                      disabled={isenabled}
                      name="idSubproyecto"
                      value={selectedIdSubProyectos}
                      onChange={(e) =>
                        setSelectedIdSubProyectos(e.target.value)
                      }
                    >
                      <option value="DEFAULT">Seleccionar Sub Proyecto</option>
                      {subProyectos.map((subproyecto) => (
                        <option key={subproyecto.ID} value={subproyecto.ID}>
                          {subproyecto.NOMBRE}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>



                <div className="row">

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

                  <div className="col-md-6 mb-5">
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
                      <i className="fas fa-save"></i>&nbsp; Guardar Actividad
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link
                      to="/actividad"
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

export default CreateActividad;
