import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_Services } from "../../../../../Config/APIService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const CreateEquipo = () => {
  const [subArea, setSubArea] = useState([]);
  const [selectedIdSubArea, setSelectedIdSubArea] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });
  const [redirect, setRedirect] = useState(false);
  const noCia = localStorage.getItem("NO_CIA");
  const token = localStorage.getItem("accessToken");
  const usenavigate = useNavigate();

  useEffect(() => {
    const fetchApiSubArea = async () => {
      try {
        const response = await fetch(
          `${API_Services}/SUBAREA/Select/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setSubArea(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiSubArea();
  }, [noCia, token]);

  const guardarEquipo = async (name, idSub, descr) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: name,
        id_subarea: idSub,
        descripcion: descr,
        no_cia: `${noCia}`,
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/EQUIPO/Insert`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Equipo guardada",
        text: "El equipo se ha guardado exitosamente",
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return usenavigate("/equipo");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    let inputNombre = form.nombre;
    let textAreaDescri = form.descripcion;
    let result = true;
    if (
      !inputNombre.trim() ||
      !textAreaDescri.trim() ||
      selectedIdSubArea === ""
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
      setForm({ ...form, idSubArea: selectedIdSubArea });
      guardarEquipo(form.nombre, selectedIdSubArea, form.descripcion);
      toast.success("Equipo guardado exitosamente", {
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
            Agregar una nuevo equipo
          </span>
        </div>

        <div className="col-md-12">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            <div className="row  ">
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
                    <label className="form-label">SUBAREA</label>
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      id="selectIDO"
                      name="idSubArea"
                      value={selectedIdSubArea}
                      onChange={(e) =>
                        setSelectedIdSubArea(e.target.value)
                      }
                    >
                      <option value="DEFAULT">Selecciona un ID</option>
                      {subArea.map((area) => (
                        <option key={area.ID} value={area.ID}>
                          {area.NOMBRE}
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

                <div className="row d-flex justify-content-center">
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btnActivity btn w-75 btn-outline-primary btn-block"
                    >
                      <i className="fas fa-save"></i>&nbsp; Guardar Equipo
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link
                      to="/equipo"
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

export default CreateEquipo;
