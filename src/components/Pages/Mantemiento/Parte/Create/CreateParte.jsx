import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { API_Services } from "../../../../Config/APIService";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";


const CreateParte = () => {
  const [listEquipo, setListEquipo] = useState([]);
  const [selectIdEquipo, setselectIdEquipo] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { noCia, token } = TokenANDnoCia();
  const usenavigate = useNavigate();

  useEffect(() => {
    const apiListEquipo = async () => {
      try {
        const response = await fetch(`${API_Services}/EQUIPO/Select/${noCia}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setListEquipo(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiListEquipo();
  }, [noCia, token]);

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
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Parte guardada",
        text: "Parte guardado exitosamente",
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {
      console.log(error);
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
     // !textAreaDescri.trim() ||
      selectIdEquipo === ""
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
      setForm({ ...form, idSubproyecto: selectIdEquipo });
      guardarParte(form.nombre, selectIdEquipo, form.descripcion);
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
            Agregar una nueva Parte
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
                    <label className="form-label">EQUIPO</label>
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      id="selectIDO"
                      name="idSubproyecto"
                      value={selectIdEquipo}
                      onChange={(e) =>
                        setselectIdEquipo(e.target.value)
                      }
                    >
                      <option value="DEFAULT">Selecciona un ID</option>
                      {listEquipo.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.NOMBRE}
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
