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
    fechaInicio: "",
    fechaFin: "",
    fechaInicioPro: "",
    fechaFinPro: "",
    descripcion_advertencia: "",
  });
  const [redirect, setRedirect] = useState(false);
  const noCia = localStorage.getItem("NO_CIA");
  const token = localStorage.getItem("accessToken");
  const usenavigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API_Services}/SUBPROYECTO/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/ETAPA/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/AREA/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/SUBAREA/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/TAREA/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/ACTIVIDAD/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/RESPONSABLE/GetLugarResponsable/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/DEPARTAMENTO/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_Services}/LUGARADVERTENCIA/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        const [
          subProyectosData,
          etapaData,
          areaData,
          subAreaData,
          tareaData,
          actividadData,
          responsableData,
          deptoData,
          advertenciaData,
        ] = data;

        console.log("ADVERTENCIA", advertenciaData)

        setSubProyectos(subProyectosData);
        setEtapa(etapaData);
        setArea(areaData);
        setSubArea(subAreaData);
        setTarea(tareaData);
        setActividad(actividadData);
        setResponsable(responsableData);
        setDepto(deptoData);
        setAdvertencia(advertenciaData);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [noCia, token]);

  const guardarTarea = async (
    name,
    idSubproyecto,
    idEtapa,
    idArea,
    idSubarea,
    idTareapadre,
    idActividad,
    fechaInicio,
    fechaFin,
    fechaInicioPro,
    fechaFinPro,
    idResponsable,
     idDepartamento,
    idLugaradvertencia,
    descripAdver,
    descrip
  ) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        no_cia: `${noCia}`,
        id_subproyecto: 1,
        ID_TAREA_PREDECESORA: 1,
        id_tareapadre: idTareapadre,
        id_responsable: 14,
        ID_FINCA_RESPONSABLE: "01",
        ID_AREA_RESPONSABLE: "04",
        ID_DEPA_RESPONSABLE: "20",
        // id_departamento: idDepartamento,
        ID_DEPARTAMENTO: 1,
        id_etapa: idEtapa,
        id_actividad: idActividad,
        ID_LUGARADVERTENCIA: 1,
        id_area: idArea,
        id_subarea: idSubarea,
        ID_EQUIPO: 1,
        ID_PARTE: 1,
        NO_CIARESPONSABLE: "04",
        nombre: name,
        directrices: descrip,
        descripcion_advertencia: descripAdver,
        fecha_inicio: "22/04/2023",
        fecha_fin: "22/04/2023",
        fecha_inicioproyectada: "22/04/2023",
        fecha_finproyectada: "22/04/2023",
        PUNTUACION: 50,
        ESTADO: "P",
        AVANCE: 4,
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/TAREA/Insert`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Tarea guardada",
        text: "La tarea se ha guardado exitosamente",
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return usenavigate("/tarea");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    let inputNombre = form.nombre;
    let textAreaDescri = form.descripcion;
    let textAreaDescriAdver = form.descripcion_advertencia;
    let fechaInicial = form.fechaInicio;
    let fechaFinal = form.fechaFin;
    let fechaInicialPro = form.fechaInicioPro;
    let fechaFinalPro = form.fechaFinPro;

    let result = true;
    if (
      !inputNombre.trim() ||
      !textAreaDescri.trim() ||
      !textAreaDescriAdver.trim() ||
      selectedIdSubProyectos === "" ||
      selectedIdEtapa === "" ||
      selectedIdArea === "" ||
      selectedIdSubArea === "" ||
      selectedIdTarea === "" ||
      selectedIdActividad === "" ||
    //   selectedIdResponsable === "" ||
      // selectedIdDepto === "" ||
      selectedIdAdvertencia === "" ||
      !fechaInicial.trim() ||
      !fechaFinal.trim() ||
      !fechaInicialPro.trim() ||
      !fechaFinalPro.trim()
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

      document.getElementById("descripAdvert").classList.remove("is-valid");
      document.getElementById("descripAdvert").classList.add("is-invalid");

      document.getElementById("selectSubProyecto").classList.remove("is-valid");
      document.getElementById("selectSubProyecto").classList.add("is-invalid");

      document.getElementById("selectEtapa").classList.remove("is-valid");
      document.getElementById("selectEtapa").classList.add("is-invalid");

      document.getElementById("selectArea").classList.remove("is-valid");
      document.getElementById("selectArea").classList.add("is-invalid");

      document.getElementById("selectSubArea").classList.remove("is-valid");
      document.getElementById("selectSubArea").classList.add("is-invalid");

      document.getElementById("selectTarea").classList.remove("is-valid");
      document.getElementById("selectTarea").classList.add("is-invalid");

      document.getElementById("selectActividad").classList.remove("is-valid");
      document.getElementById("selectActividad").classList.add("is-invalid");

      document.getElementById("fechaInicio").classList.remove("is-valid");
      document.getElementById("fechaInicio").classList.add("is-invalid");

      document.getElementById("fechaInicioPro").classList.remove("is-valid");
      document.getElementById("fechaInicioPro").classList.add("is-invalid");

      document.getElementById("fechaFin").classList.remove("is-valid");
      document.getElementById("fechaFin").classList.add("is-invalid");

      document.getElementById("fechaFinPro").classList.remove("is-valid");
      document.getElementById("fechaFinPro").classList.add("is-invalid");

    //   document.getElementById("idResponsable").classList.remove("is-valid");
    //   document.getElementById("idResponsable").classList.add("is-invalid");

      // document.getElementById("idDepartamento").classList.remove("is-valid");
      // document.getElementById("idDepartamento").classList.add("is-invalid");

      document
        .getElementById("idLugaradvertencia")
        .classList.remove("is-valid");
      document.getElementById("idLugaradvertencia").classList.add("is-invalid");
    } else {
      setForm({
        ...form,
        idSubproyecto: selectedIdSubProyectos,
        idEtapa: selectedIdEtapa,
        idArea: selectedIdArea,
        idSubarea: selectedIdSubArea,
        idTareapadre: selectedIdTarea,
        idActividad: selectedIdActividad,
        // idResponsable: selectedIdResponsable,
        // idDepartamento: selectedIdDepto,
        idLugaradvertencia: selectedIdAdvertencia,
      });
      guardarTarea(
        form.nombre,
        selectedIdSubProyectos,
        selectedIdEtapa,
        selectedIdArea,
        selectedIdSubArea,
        selectedIdTarea,
        selectedIdActividad,
        // selectedIdResponsable,
        // selectedIdDepto,
        selectedIdAdvertencia,
        form.descripcion,
        form.fechaInicio,
        form.fechaFin,
        form.fechaInicioPro,
        form.fechaFinPro,
        form.descripcion_advertencia
      );
      toast.success("Area guardado exitosamente", {
        theme: "colored",
      });
      document.getElementById("nombreINP").classList.remove("is-invalid");
      document.getElementById("nombreINP").classList.add("is-valid");

      document.getElementById("inputDes").classList.remove("is-invalid");
      document.getElementById("inputDes").classList.add("is-valid");

      document.getElementById("descripAdvert").classList.remove("is-invalid");
      document.getElementById("descripAdvert").classList.add("is-valid");

      document
        .getElementById("selectSubProyecto")
        .classList.remove("is-invalid");
      document.getElementById("selectSubProyecto").classList.add("is-valid");

      document.getElementById("selectEtapa").classList.remove("is-invalid");
      document.getElementById("selectEtapa").classList.add("is-valid");

      document.getElementById("selectArea").classList.remove("is-invalid");
      document.getElementById("selectArea").classList.add("is-valid");

      document.getElementById("selectSubArea").classList.remove("is-invalid");
      document.getElementById("selectSubArea").classList.add("is-valid");

      document.getElementById("selectTarea").classList.remove("is-invalid");
      document.getElementById("selectTarea").classList.add("is-valid");

      document.getElementById("selectActividad").classList.remove("is-invalid");
      document.getElementById("selectActividad").classList.add("is-valid");

      document.getElementById("fechaInicio").classList.remove("is-invalid");
      document.getElementById("fechaInicio").classList.add("is-valid");

      document.getElementById("fechaInicioPro").classList.remove("is-invalid");
      document.getElementById("fechaInicioPro").classList.add("is-valid");

      document.getElementById("fechaFin").classList.remove("is-invalid");
      document.getElementById("fechaFin").classList.add("is-valid");

      document.getElementById("fechaFinPro").classList.remove("is-invalid");
      document.getElementById("fechaFinPro").classList.add("is-valid");

    //   document.getElementById("idResponsable").classList.remove("is-invalid");
    //   document.getElementById("idResponsable").classList.add("is-valid");

      // document.getElementById("idDepartamento").classList.remove("is-invalid");
      // document.getElementById("idDepartamento").classList.add("is-valid");

      document
        .getElementById("idLugaradvertencia")
        .classList.remove("is-invalid");
      document.getElementById("idLugaradvertencia").classList.add("is-valid");
    }
    return result;
  };

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
              <form onSubmit={handleInputChange}>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">NOMBRE</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombreINP"
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
                        id="selectSubProyecto"
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
                        id="selectEtapa"
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
                        id="selectArea"
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
                        id="selectSubArea"
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
                        name="idTareapadre"
                        value={selectedIdTarea}
                        id="selectTarea"
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
                        id="selectActividad"
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
                        id="fechaInicio"
                        name="fechaInicio"
                        value={form.fechaInicio}
                        onChange={(e) => {
                          setForm({ ...form, fechaInicio: e.target.value });
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
                        name="fechaInicioPro"
                        id="fechaInicioPro"
                        value={form.fechaInicioPro}
                        onChange={(e) => {
                          setForm({ ...form, fechaInicioPro: e.target.value });
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
                        id="fechaFin"
                        name="fechaFin"
                        value={form.fechaFin}
                        onChange={(e) => {
                          setForm({ ...form, fechaFin: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">FECHA FIN PROYECTADA</label>
                      <input
                        type="date"
                        id="fechaFinPro"
                        className="form-control"
                        name="fechaFinPro"
                        value={form.fechaFinPro}
                        onChange={(e) => {
                          setForm({ ...form, fechaFinPro: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Responsable</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        id="idResponsable"
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
                  </div> */}

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Departamento</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        id="idDepartamento"
                        name="idDepartamento"
                        value={selectedIdDepto}
                        onChange={(e) => setSelectedIdDepto(e.target.value)}
                      >
                        <option value="DEFAULT">
                          Selecciona un Departamento
                        </option>
                        {depto.map((item) => (
                          <option key={item.DESCRIPCION} value={item.DESCRIPCION}>
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
                        name="idLugaradvertencia"
                        id="idLugaradvertencia"
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
                        id="descripAdvert"
                        className="form-control"
                        name="descripAdver"
                        value={form.descripcion_advertencia}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            descripcion_advertencia: e.target.value,
                          });
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
