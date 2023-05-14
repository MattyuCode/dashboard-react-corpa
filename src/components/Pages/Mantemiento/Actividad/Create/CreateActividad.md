import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import "./CreateActividad.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const CreateActividad = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () => setIsOpen(!isOpen);
  const [subProyectos, setSubProyectos] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    // idSubproyecto: "",
    descripcion: "",
  });
  const [redirect, setRedirect] = useState(false);
  const noCia = localStorage.getItem("NO_CIA");
  const token = localStorage.getItem("accessToken");
  const apiUrl =
    "https://apiproyectosdesarrollo.corpacam.com.gt/api/ACTIVIDAD/Insert";
  const ApiSubProyectos = `https://apiproyectosdesarrollo.corpacam.com.gt/api/SUBPROYECTO/Select/${noCia}`;
  const usenavigate = useNavigate();

  useEffect(() => {
    const fetchApiSubProyectos = async (accessToken) => {
      try {
        const response = await fetch(ApiSubProyectos, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setSubProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiSubProyectos(token);
  }, [ApiSubProyectos, token]);

  const guardarActividad = async (name, idpro, descr) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: name,
        id_subproyecto: idpro,
        descripcion: descr,
        no_cia: `${noCia}`,
      }),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Actividad guardada",
        text: "La actvidad se ha guardado exitosamente",
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return usenavigate("/actividad");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    let inputNombre = form.nombre;
    let textAreaDescri = form.descripcion;
    let result = true;
    if (
      !inputNombre.trim() ||
      !textAreaDescri.trim() ||
      selectedIdSubProyectos === ""
    ) {
      result = false;
      console.log("NO hay datos ");
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });
      document.getElementById("nombreINP").classList.remove("is-valid");
      document.getElementById("nombreINP").classList.add("is-invalid");

      document.getElementById("inputDes").classList.remove("is-valid");
      document.getElementById("inputDes").classList.add("is-invalid");

      document.getElementById("selectIDO").classList.remove("is-valid");
      document.getElementById("selectIDO").classList.add("is-invalid");
    } else {
      setForm({ ...form, idSubproyecto: selectedIdSubProyectos });
      guardarActividad(form.nombre, selectedIdSubProyectos, form.descripcion);
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
    <div className="container contCreateActivi">
      <h3 className="text-center " style={{}}>
        Agregar una nueva actividad
      </h3>
      <div className="col-lg-8 mb-lg-0">
        <div className="card shadow " style={{ borderRadius: "15px" }}>
          <div className="card-body py-5 px-md-5">
            <form onSubmit={handleInputChange}>
              <div className="row">
                <div className="col-md-7 mb-4">
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

                <div className="col-md-5 mb-4">
                  <label className="form-label">ID SUBPROYECTO</label>
                  <select
                    className="form-select"
                    defaultValue={"DEFAULT"}
                    id="selectIDO"
                    name="idSubproyecto"
                    value={selectedIdSubProyectos}
                    onChange={(e) => setSelectedIdSubProyectos(e.target.value)}
                  >
                    <option value="DEFAULT">Selecciona un ID</option>
                    {subProyectos.map((proyecto) => (
                      <option key={proyecto.ID} value={proyecto.ID}>
                        {proyecto.NOMBRE}
                      </option>
                    ))}
                  </select>
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

              <div className="">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn w-100 btn-primary btn-block"
                    >
                      <i className="fas fa-save"></i>&nbsp; Guardar Actividad
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/actividad"
                      type="submit"
                      className="btn w-100 btn-danger btn-block"
                    >
                      <IoArrowBackOutline /> Regresar
                    </Link>
                  </div>
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

export default CreateActividad;
