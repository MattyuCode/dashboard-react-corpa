import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { API_Services } from "../../../../../Config/APIService";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const EditArea = () => {
  const { ID } = useParams();
  const [subProyectos, setSubProyectos] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });
  const noCia = localStorage.getItem("NO_CIA");
  const token = localStorage.getItem("accessToken");
  const usenavigate = useNavigate();

  useEffect(() => {
    const fetchApiSubProyectos = async () => {
      try {
        const response = await fetch(
          `${API_Services}/SUBPROYECTO/Select/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setSubProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchArea = async () => {
      try {
        const response = await fetch(
          `${API_Services}/AREA/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setForm({
          nombre: data[0].NOMBRE,
          descripcion: data[0].DESCRIPCION,
        });
        setSelectedIdSubProyectos(data[0].ID_SUBPROYECTO);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiSubProyectos();
    fetchArea();
  }, [ID, noCia, token]);

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
        id_subproyecto: idpro,
        descripcion: descr,
        no_cia: `${noCia}`,
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/AREA/${ID}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Area actualizada",
        text: "El area se ha actualizado exitosamente",
      }).then(() => {
        usenavigate("/area");
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      fetchAPIEditar(form.nombre, selectedIdSubProyectos, form.descripcion);

      document.getElementById("nombreINP").classList.remove("is-invalid");
      document.getElementById("nombreINP").classList.add("is-valid");

      document.getElementById("inputDes").classList.remove("is-invalid");
      document.getElementById("inputDes").classList.add("is-valid");

      document.getElementById("selectIDO").classList.remove("is-invalid");
      document.getElementById("selectIDO").classList.add("is-valid");
      console.log("Se enviaron los datos correctamente");
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
          <span className="titless text-center">Editar Area</span>
        </div>

        <div className="col-md-12 ">
          <div className=" shadow" style={{ padding: " 4rem" }}>
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
                  <label className="form-label">SUBPROYECTO</label>
                  <select
                    className="form-select"
                    value={selectedIdSubProyectos}
                    id="selectIDO"
                    name="idSubproyecto"
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
                    to="/area"
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

export default EditArea;
