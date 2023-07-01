import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_Services } from "../../../../../Config/APIService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const CreateTarea = () => {
  const [subProyectos, setSubProyectos] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState("");
  const [etapa, setEtapa] = useState([]);
  const [selectedIdEtapa, setSelectedIdEtapa] = useState("");
  const [area, setArea] = useState([]);
  const [selectedIdArea, setSelectedIdArea] = useState("");
  const [subArea, setSubArea] = useState([]);
  const [selectedIdSubArea, setSelectedIdSubArea] = useState("");
  const [tarea, setTarea] = useState([]);
  const [selectedIdTarea, setSelectedIdTarea] = useState("");
  const [actividad, setActividad] = useState([]);
  const [selectedIdActividad, setSelectedIdActividad] = useState("");
  const [responsable, setResponsable] = useState([]);
  const [selectedIdResponsable, setSelectedIdResponsable] = useState("");
  const [depto, setDepto] = useState([]);
  const [selectedIdDepto, setSelectedIdDepto] = useState("");
  const [advertencia, setAdvertencia] = useState([]);
  const [selectedIdAdvertencia, setSelectedIdAdvertencia] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });
  const [redirect, setRedirect] = useState(false);
  const noCia = localStorage.getItem("NO_CIA");
  const token = localStorage.getItem("accessToken");
  const usenavigate = useNavigate();

  //   useEffect(() => {
  //     const ApiSubProyectos = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_Services}/SUBPROYECTO/Select/${noCia}`,
  //           { headers: { Authorization: `Bearer ${token}` } }
  //         );
  //         const data = await response.json();
  //         console.log("SUBPROYECTOS", data);
  //         // data.forEach(element => {
  //         //     console.log(element.NOMBRE)
  //         // });
  //         setSubProyectos(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiEtapa = async () => {
  //       try {
  //         const response = await fetch(`${API_Services}/ETAPA/Select/${noCia}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const data = await response.json();
  //         console.log("ETAPA", data);
  //         setEtapa(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiArea = async () => {
  //       try {
  //         const response = await fetch(`${API_Services}/AREA/Select/${noCia}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const data = await response.json();
  //         setArea(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiSubArea = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_Services}/SUBAREA/Select/${noCia}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const data = await response.json();
  //         setSubArea(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiTarea = async () => {
  //       try {
  //         const response = await fetch(`${API_Services}/TAREA/Select/${noCia}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const data = await response.json();
  //         setTarea(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiActividad = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_Services}/ACTIVIDAD/Select/${noCia}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const data = await response.json();
  //         setActividad(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiResponsables = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_Services}/RESPONSABLE/GetLugarResponsable/${noCia}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const data = await response.json();
  //         setResponsable(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiDepartamento = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_Services}/DEPARTAMENTO/Select/${noCia}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const data = await response.json();
  //         setDepto(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const ApiAdvertencia = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_Services}/LUGARADVERTENCIA/Select/${noCia}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const data = await response.json();
  //         setAdvertencia(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     ApiAdvertencia();
  //     ApiDepartamento();
  //     ApiResponsables();
  //     ApiActividad();
  //     ApiTarea();
  //     ApiSubArea();
  //     ApiArea();
  //     ApiEtapa();
  //     ApiSubProyectos();
  //   }, [noCia, token]);

 

  return (
    <div className="container mt-4  contCreateActivi">
      <div className="row rowALl">
        <div className="col-md-12">
          <span className="text-center titless " style={{}}>
            Agregar una nueva Tarea
          </span>
        </div>

        <div className="col-md-12">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            <div className="row  ">
              <form onSubmit={{}}>
                <div className="row">
                  <div className="col-md-12 mb-4">
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

                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Proyecto</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idSubproyecto"
                        value={selectedIdSubProyectos}
                        onChange={(e) =>
                          setSelectedIdSubProyectos(e.target.value)
                        }
                      >
                        <option value="DEFAULT">Selecciona un Proyecto</option>
                        {subProyectos.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Etapa</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idEtapa"
                        value={selectedIdEtapa}
                        onChange={(e) => setSelectedIdEtapa(e.target.value)}
                      >
                        <option value="DEFAULT">Selecciona una Etapa</option>
                        {etapa.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Area</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idArea"
                        value={selectedIdArea}
                        onChange={(e) => setSelectedIdArea(e.target.value)}
                      >
                        <option value="DEFAULT">Selecciona una Area</option>
                        {area.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Subarea</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idSubarea"
                        value={selectedIdSubArea}
                        onChange={(e) => setSelectedIdSubArea(e.target.value)}
                      >
                        <option value="DEFAULT">Selecciona una Subarea</option>
                        {subArea.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Tarea</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idTarea"
                        value={selectedIdTarea}
                        onChange={(e) => setSelectedIdTarea(e.target.value)}
                      >
                        <option value="DEFAULT">Selecciona una Tarea</option>
                        {tarea.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Actividad</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idActividad"
                        value={selectedIdActividad}
                        onChange={(e) => setSelectedIdActividad(e.target.value)}
                      >
                        <option value="DEFAULT">
                          Selecciona una Actividad
                        </option>
                        {actividad.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* <div className="row"> */}
                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">DIRECTRICES</label>
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
                  {/* </div> */}

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA INICIO</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaIncio"
                        // value=""
                        onChange={() => {
                          //   setForm({ ...form, nombre: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">
                        FECHA INICIO PROYECTADA
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaIncioProyectada"
                        // value=""
                        onChange={() => {
                          //   setForm({ ...form, nombre: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA FIN</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaFin"
                        // value=""
                        onChange={() => {
                          //   setForm({ ...form, nombre: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA FIN PROYECTADA</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaFinProyectada"
                        // value=""
                        onChange={() => {
                          //   setForm({ ...form, nombre: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Responsable</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idResponsable"
                        value={selectedIdResponsable}
                        onChange={(e) =>
                          setSelectedIdResponsable(e.target.value)
                        }
                      >
                        <option value="DEFAULT">
                          Selecciona un Responsable
                        </option>
                        {responsable.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Departamento</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idDepartamento"
                        value={selectedIdDepto}
                        onChange={(e) => setSelectedIdDepto(e.target.value)}
                      >
                        <option value="DEFAULT">
                          Selecciona un Departamento
                        </option>
                        {depto.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.DESCRIPCION}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Lugar de Advertencia</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idAdvertencia"
                        value={selectedIdAdvertencia}
                        onChange={(e) =>
                          setSelectedIdAdvertencia(e.target.value)
                        }
                      >
                        <option value="DEFAULT">
                          Selecciona un Lugar de Advertencia
                        </option>
                        {advertencia.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">
                        DESCIPCION ADVERTENCIA
                      </label>
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

                  {/* 
                  <div className="col-md-5 mb-4">
                    <label className="form-label">SUBPROYECTO</label>
                    <select
                      className="form-select"
                      defaultValue={"DEFAULT"}
                      id="selectIDO"
                      name="idSubproyecto"
                      value={selectedIdSubProyectos}
                      onChange={(e) =>
                        setSelectedIdSubProyectos(e.target.value)
                      }
                    >
                      <option value="DEFAULT">Selecciona un ID</option>
                      {subProyectos.map((proyecto) => (
                        <option key={proyecto.ID} value={proyecto.ID}>
                          {proyecto.NOMBRE}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>

                <div className="row d-flex justify-content-center mt-3">
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btnActivity btn w-75 btn-outline-success btn-block"
                    >
                      <i className="fas fa-save"></i>&nbsp; Guardar Tarea
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link
                      to="/tarea"
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

export default CreateTarea;
