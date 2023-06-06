import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import { API_Services } from "../../../../Config/APIService";

const DetallesSubTarea = () => {
  const { ID } = useParams();
  const usenavigate = useNavigate();
  const { noCia, token } = TokenANDnoCia();
  const [proyectos, setProyectos] = useState([]);
  const [subProyectos, setSubProyectos] = useState([]);
  const [etapa, setEtapa] = useState([]);
  const [area, setArea] = useState([]);
  const [subArea, setSubArea] = useState([]);
  const [equipo, setEquipo] = useState([]);
  const [parte, setParte] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [responsable, setResponsable] = useState([]);
  const [depto, setDepto] = useState([]);
  const [advertencia, setAdvertencia] = useState([]);

  //COMMENT:------------------------------------------>
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState(0);
  const [selectedIdProyectos, setSelectedIdProyectos] = useState(0);
  const [selectedIdEtapa, setSelectedIdEtapa] = useState("");
  const [selectedIdArea, setSelectedIdArea] = useState("");
  const [selectedIdSubArea, setSelectedIdSubArea] = useState("");
  const [selectedIdEquipo, setSelectedIdEquipo] = useState("");
  const [selectedIdParte, setSelectedIdParte] = useState("");
  const [selectedIdActividad, setSelectedIdActividad] = useState("");
  const [selectedIdResponsable, setSelectedIdResponsable] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedIdAdvertencia, setSelectedIdAdvertencia] = useState("");
  const [nombreTarea, setNombreTarea] = useState("");
  const [IDTareaPadre, setIDTareaPadre] = useState("");
  const [finca, setFinca] = useState("");
  const [depa, setDepa] = useState("");
  const [are_a, setAre_a] = useState("");
  const [num_cia, setNumCia] = useState("");
  const [codigoEmpelado, setCodigoEmpleado] = useState("");
  const [puntuacion, setPuntuacion] = useState("");
  const [avance, setAvence] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    descripAdver: "",
    fechaInicio: "",
    fechaFin: "",
    fechaInicioPro: "",
    fechaFinPro: "",
  });

  const cambiarFormatoFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    const formateado = `${day}/${month}/${year}`;
    return formateado;
  };

  useEffect(() => {
    const APIs = async () => {
      try {
        const responses = await fetch(
          `${API_Services}/TAREA/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await responses.json();
        setNombreTarea(data[0].NOMBRE);
        setIDTareaPadre(data[0].ID);

        const responseProyecto = await fetch(
          `${API_Services}/PROYECTO/Select/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const proyectoData = await responseProyecto.json();
        setProyectos(proyectoData.sort((a, b) => a.ID - b.ID));

        const responseSubproyecto = await fetch(
          `${API_Services}/SUBPROYECTO/Select/${noCia}/${selectedIdProyectos}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const subproyectoData = await responseSubproyecto.json();
        setSubProyectos(subproyectoData);

        const areaResponse = await fetch(
          `${API_Services}/AREA/SelectIdSubProyecto/${noCia}/${selectedIdSubProyectos}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const areaData = await areaResponse.json();
        setArea(areaData);

        const responsableResponse = await fetch(
          `${API_Services}/RESPONSABLE/GetLugarResponsable/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const responsableData = await responsableResponse.json();
        setResponsable(responsableData);

        const deptoResponse = await fetch(
          `${API_Services}/DEPARTAMENTO/Select/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const deptoData = await deptoResponse.json();
        setDepto(deptoData);
      } catch (e) {
        console.log(e);
      }
    };
    APIs();
  }, [ID, noCia, token, selectedIdProyectos, selectedIdSubProyectos]);

  const listEtapa = async (idSubproyecto) => {
    setSelectedIdSubProyectos(idSubproyecto);
    const response = await fetch(
      `${API_Services}/ETAPA/SelectIdSubproyecto/${noCia}/${idSubproyecto}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setEtapa(data);
  };

  const listActividad = async (idSubproyecto) => {
    setSelectedIdSubProyectos(idSubproyecto);
    const response = await fetch(
      `${API_Services}/ACTIVIDAD/SelectIdSubproyecto/${noCia}/${idSubproyecto}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setActividad(data);
  };

  const listAdvertencia = async (idSubproyecto) => {
    setSelectedIdSubProyectos(idSubproyecto);
    const response = await fetch(
      `${API_Services}/LUGARADVERTENCIA/SelectSubProyecto/${noCia}/${idSubproyecto}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setAdvertencia(data);
  };

  const listSubArea = async (idArea) => {
    setSelectedIdArea(idArea);
    const response = await fetch(
      `${API_Services}/SUBAREA/SelectIdArea/${noCia}/${idArea}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setSubArea(data);
  };

  const listEquipo = async (idSubArea) => {
    setSelectedIdSubArea(idSubArea);
    const response = await fetch(
      `${API_Services}/EQUIPO/SelectIdSubarea/${noCia}/${idSubArea}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setEquipo(data);
  };

  const listParte = async (idEquipo) => {
    setSelectedIdEquipo(idEquipo);
    const response = await fetch(
      `${API_Services}/PARTE/SelectIdEquipo/${noCia}/${idEquipo}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setParte(data);
  };

  const saveSubTarea = async (nombre, descripcion, descripAdver) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        NO_CIA: `${noCia}`,
        ID_SUBPROYECTO: selectedIdSubProyectos,
        ID_TAREA_PREDECESORA: 1,
        ID_TAREAPADRE: IDTareaPadre,
        ID_RESPONSABLE: codigoEmpelado,
        ID_FINCA_RESPONSABLE: finca,
        ID_AREA_RESPONSABLE: are_a,
        ID_DEPA_RESPONSABLE: depa,
        ID_DEPARTAMENTO: 1,
        ID_ETAPA: selectedIdEtapa,
        ID_ACTIVIDAD: selectedIdActividad,
        ID_LUGARADVERTENCIA: selectedIdAdvertencia,
        ID_AREA: selectedIdArea,
        ID_SUBAREA: selectedIdSubArea,
        ID_EQUIPO: selectedIdEquipo,
        ID_PARTE: selectedIdParte,
        NO_CIARESPONSABLE: num_cia,
        NOMBRE: nombre,
        DIRECTRICES: descripcion,
        DESCIPCION_ADVERTENCIA: descripAdver,
        FECHA_INICIO: cambiarFormatoFecha(form.fechaInicio),
        FECHA_FIN: cambiarFormatoFecha(form.fechaFin),
        FECHA_INICIOPROYECTADA: cambiarFormatoFecha(form.fechaInicioPro),
        FECHA_FINPROYECTADA: cambiarFormatoFecha(form.fechaFinPro),
        PUNTUACION: Number(puntuacion),
        ESTADO: "P",
        AVANCE: Number(avance),
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/TAREA/InsertSubTarea`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "SUbtarea guardada",
        text: "La SUbtarea se ha guardado exitosamente",
      }).then(() => {
        return usenavigate(`/detailsTarea/${noCia}/${ID}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    let inputNOmbre = form.nombre,
      inputDescrip = form.descripcion,
      inputDesriAdver = form.descripAdver,
      fechaINICIO = form.fechaInicio,
      fechaFIN = form.fechaFin,
      fechaINCIOpro = form.fechaInicioPro,
      fechaFINPRO = form.fechaFinPro,
      result = true;

    if (
      !inputNOmbre.trim() ||
      !inputDescrip.trim() ||
      !inputDesriAdver.trim() ||
      !fechaINICIO.trim() ||
      !fechaFIN.trim() ||
      !fechaINCIOpro.trim() ||
      !fechaFINPRO.trim() ||
      selectedIdProyectos === "" ||
      selectedIdSubProyectos === "" ||
      selectedIdEtapa === "" ||
      selectedIdArea === "" ||
      selectedIdSubArea === "" ||
      selectedIdEquipo === "" ||
      selectedIdParte === "" ||
      selectedIdActividad === "" ||
      selectedIdResponsable === "" ||
      selectedOption === "" ||
      selectedIdAdvertencia === "" ||
      avance === ""
    ) {
      result = false;
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });

      document.getElementById("nombre").classList.add("is-invalid");
      document.getElementById("nombre").classList.remove("is-valid");
      document.getElementById("descripcion").classList.add("is-invalid");
      document.getElementById("descripcion").classList.remove("is-valid");
      document.getElementById("fechaInicio").classList.add("is-invalid");
      document.getElementById("fechaInicio").classList.remove("is-valid");
      document.getElementById("fechaFin").classList.add("is-invalid");
      document.getElementById("fechaFin").classList.remove("is-valid");
      document.getElementById("idProyecto").classList.add("is-invalid");
      document.getElementById("idProyecto").classList.remove("is-valid");
      document.getElementById("idSubproyecto").classList.add("is-invalid");
      document.getElementById("idSubproyecto").classList.remove("is-valid");

      document.getElementById("idEtapa").classList.add("is-invalid");
      document.getElementById("idEtapa").classList.remove("is-valid");

      document.getElementById("idArea").classList.add("is-invalid");
      document.getElementById("idArea").classList.remove("is-valid");

      document.getElementById("selectSubArea").classList.add("is-invalid");
      document.getElementById("selectSubArea").classList.remove("is-valid");

      document.getElementById("selectEquipo").classList.add("is-invalid");
      document.getElementById("selectEquipo").classList.remove("is-valid");

      document.getElementById("selectparte").classList.add("is-invalid");
      document.getElementById("selectparte").classList.remove("is-valid");

      document.getElementById("selectActividad").classList.add("is-invalid");
      document.getElementById("selectActividad").classList.remove("is-valid");

      document.getElementById("idLugaradvertencia").classList.add("is-invalid");
      document
        .getElementById("idLugaradvertencia")
        .classList.remove("is-valid");

      document.getElementById("fechaInicioPro").classList.add("is-invalid");
      document.getElementById("fechaInicioPro").classList.remove("is-valid");

      document.getElementById("fechaFinPro").classList.add("is-invalid");
      document.getElementById("fechaFinPro").classList.remove("is-valid");

      document.getElementById("idResponsable").classList.add("is-invalid");
      document.getElementById("idResponsable").classList.remove("is-valid");

      document.getElementById("idDepartamento").classList.add("is-invalid");
      document.getElementById("idDepartamento").classList.remove("is-valid");

      document.getElementById("descripAdvert").classList.add("is-invalid");
      document.getElementById("descripAdvert").classList.remove("is-valid");

      document.getElementById("idPuntuacion").classList.add("is-invalid");
      document.getElementById("idPuntuacion").classList.remove("is-valid");

      document.getElementById("idAvance").classList.add("is-invalid");
      document.getElementById("idAvance").classList.remove("is-valid");
    } else {
      saveSubTarea(form.nombre, form.descripcion, form.descripAdver);
      toast.success("Subtarea guardado exitosamente", {
        theme: "colored",
      });

      document.getElementById("nombre").classList.remove("is-invalid");
      document.getElementById("nombre").classList.add("is-valid");

      document.getElementById("descripcion").classList.remove("is-invalid");
      document.getElementById("descripcion").classList.add("is-valid");

      document.getElementById("fechaInicio").classList.remove("is-invalid");
      document.getElementById("fechaInicio").classList.add("is-valid");

      document.getElementById("fechaFin").classList.remove("is-invalid");
      document.getElementById("fechaFin").classList.add("is-valid");

      document.getElementById("idProyecto").classList.remove("is-invalid");
      document.getElementById("idProyecto").classList.add("is-valid");

      document.getElementById("idSubproyecto").classList.remove("is-invalid");
      document.getElementById("idSubproyecto").classList.add("is-valid");

      document.getElementById("idEtapa").classList.remove("is-invalid");
      document.getElementById("idEtapa").classList.add("is-valid");

      document.getElementById("idArea").classList.remove("is-invalid");
      document.getElementById("idArea").classList.add("is-valid");

      document.getElementById("selectSubArea").classList.remove("is-invalid");
      document.getElementById("selectSubArea").classList.add("is-valid");

      document.getElementById("selectEquipo").classList.remove("is-invalid");
      document.getElementById("selectEquipo").classList.add("is-valid");

      document.getElementById("selectparte").classList.remove("is-invalid");
      document.getElementById("selectparte").classList.add("is-valid");

      document.getElementById("selectActividad").classList.remove("is-invalid");
      document.getElementById("selectActividad").classList.add("is-valid");

      document
        .getElementById("idLugaradvertencia")
        .classList.remove("is-invalid");
      document.getElementById("idLugaradvertencia").classList.add("is-valid");

      document.getElementById("fechaInicioPro").classList.remove("is-invalid");
      document.getElementById("fechaInicioPro").classList.add("is-valid");

      document.getElementById("fechaFinPro").classList.remove("is-invalid");
      document.getElementById("fechaFinPro").classList.add("is-valid");

      document.getElementById("idResponsable").classList.remove("is-invalid");
      document.getElementById("idResponsable").classList.add("is-valid");

      document.getElementById("idDepartamento").classList.remove("is-invalid");
      document.getElementById("idDepartamento").classList.add("is-valid");

      document.getElementById("descripAdvert").classList.remove("is-invalid");
      document.getElementById("descripAdvert").classList.add("is-valid");

      document.getElementById("idPuntuacion").classList.remove("is-invalid");
      document.getElementById("idPuntuacion").classList.add("is-valid");

      document.getElementById("idAvance").classList.remove("is-invalid");
      document.getElementById("idAvance").classList.add("is-valid");
    }
    return result;
  };

  const handleSelectedDepto = (selected) => {
    const found = depto.find((item) => item.DESCRIPCION === selected);
    if (found) {
      const { FINCA, AREA, DEPA } = found;
      setFinca(FINCA);
      setAre_a(AREA);
      setDepa(DEPA);
    }
    setSelectedOption(selected);
  };

  const handleSelectedResponsable = (selected) => {
    const found = responsable.find((item) => item.NOMBRE === selected);
    if (found) {
      const { NO_CIA, CODIGO_EMPLEADO } = found;
      setNumCia(NO_CIA);
      setCodigoEmpleado(CODIGO_EMPLEADO);
    }
    setSelectedIdResponsable(selected);
  };

  return (
    <div className="container mt-4  contCreateActivi">
      <div className="row rowALl">
        <div className="col-md-12">
          <span className="text-center titless " style={{}}>
            Agregar una sub tarea
          </span>
        </div>

        <div className="col-md-12 mb-5">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            <div className="row  ">
              <form onSubmit={handleInputChange} className="formuTarea">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">NOMBRE SUBTAREA</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={(e) => {
                          setForm({ ...form, nombre: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Proyecto</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        id="idProyecto"
                        name="idProyecto"
                        value={selectedIdProyectos}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue !== "DEFAULT") {
                            setSelectedIdProyectos(e.target.value);
                          } else {
                            setSelectedIdProyectos("");
                          }
                        }}
                      >
                        <option value="DEFAULT">Selecciona un Proyecto</option>
                        {proyectos.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.DESCRIPCION}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Subproyecto</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        id="idSubproyecto"
                        name="idSubproyecto"
                        value={selectedIdSubProyectos}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue !== "DEFAULT") {
                            listEtapa(e.target.value);
                            listActividad(e.target.value);
                            listAdvertencia(e.target.value);
                          } else {
                            setSelectedIdSubProyectos("");
                          }
                        }}
                      >
                        <option value="DEFAULT">
                          Selecciona un Subproyecto
                        </option>
                        {subProyectos.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Etapa</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        id="idEtapa"
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
                        id="idArea"
                        name="idArea"
                        value={selectedIdArea}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue !== "DEFAULT") {
                            listSubArea(e.target.value);
                          } else {
                            setSelectedIdArea("");
                          }
                        }}
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
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue !== "DEFAULT") {
                            listEquipo(e.target.value);
                          } else {
                            setSelectedIdSubArea("");
                          }
                        }}
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

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Equipo</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idEquipo"
                        id="selectEquipo"
                        value={selectedIdEquipo}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue !== "DEFAULT") {
                            listParte(e.target.value);
                          } else {
                            setSelectedIdEquipo("");
                          }
                        }}
                      >
                        <option value="DEFAULT">Selecciona una Equipo</option>
                        {equipo.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Parte</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idParte"
                        id="selectparte"
                        value={selectedIdParte}
                        onChange={(e) => setSelectedIdParte(e.target.value)}
                      >
                        <option value="DEFAULT">Selecciona una Parte</option>
                        {parte.map((item) => (
                          <option key={item.ID} value={item.ID}>
                            {item.NOMBRE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-md-6 mb-4">
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
                  </div> */}

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

                  <div className="col-md-6 mb-4">
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
                      <label className="form-label">DIRECTRICES</label>
                      <textarea
                        type="text"
                        id="descripcion"
                        className="form-control"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={(e) => {
                          setForm({ ...form, descripcion: e.target.value });
                        }}
                      />
                    </div>
                  </div>

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

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Responsable</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        id="idResponsable"
                        name="idResponsable"
                        value={selectedIdResponsable}
                        onChange={(e) =>
                          handleSelectedResponsable(e.target.value)
                        }
                      >
                        <option value="DEFAULT">
                          Selecciona un Responsable
                        </option>
                        {responsable.map((item, index) => (
                          // <option key={item.ID} value={item.ID}>
                          <option key={index} value={item.NOMBRE}>
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
                        id="idDepartamento"
                        name="idDepartamento"
                        value={selectedOption}
                        onChange={(e) => handleSelectedDepto(e.target.value)}
                      >
                        <option value="DEFAULT">
                          Selecciona un Departamento
                        </option>
                        {depto.map((item, index) => (
                          <option
                            // key={`${item.FINCA}-${item.AREA}-${item.DEPA}`}
                            key={index}
                            value={item.DESCRIPCION}
                          >
                            {item.DESCRIPCION}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">NOMBRE TAREA PADRE</label>
                      <input
                        value={nombreTarea}
                        type="text"
                        // name="puntuacion"
                        // id="idPuntuacion"
                        className="form-control"
                        // onChange={(e) => setPuntuacion(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label">ID TAREA PADRE</label>
                      <input
                        value={IDTareaPadre}
                        type="text"
                        // name="puntuacion"
                        // id="idPuntuacion"
                        className="form-control"
                        // onChange={(e) => setPuntuacion(e.target.value)}
                        readOnly
                      />
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
                        value={form.descripAdver}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            descripAdver: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-5">
                    <div className="form-outline">
                      <label htmlFor="form-label">PUNTUACIÓN</label>
                      <input
                        value={puntuacion}
                        type="number"
                        name="puntuacion"
                        id="idPuntuacion"
                        placeholder="Ingresa un número de puntuacion"
                        className="form-control"
                        onChange={(e) => setPuntuacion(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-5">
                    <div className="form-outline">
                      <label htmlFor="form-label">AVANCE</label>
                      <select
                        className="form-select"
                        defaultValue={"DEFAULT"}
                        name="idAvance"
                        id="idAvance"
                        value={avance}
                        onChange={(e) => setAvence(e.target.value)}
                      >
                        <option value="DEFAULT">
                          Selecciona un número de avance
                        </option>
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index * 10}>
                            {index * 10}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-center mt-3">
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btnActivity btn w-75 btn-outline-success btn-block"
                    >
                      <i className="fas fa-save"></i>&nbsp; Guardar Subtarea
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link
                      to={`/detailsTarea/${noCia}/${ID}`}
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

export default DetallesSubTarea;
