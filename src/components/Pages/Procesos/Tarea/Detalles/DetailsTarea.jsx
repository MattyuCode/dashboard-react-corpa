import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import { API_Services } from "../../../../Config/APIService";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  Table,
  Modal,
  Button,
  Pagination,
  Slider,
  Progress,
  InputNumber,
} from "rsuite";
import "rsuite/dist/rsuite.css";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const DetailsTarea = () => {
  const usenavigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(false);
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [detalle, setDetalle] = useState("");
  const [datosAvance, setDatosAvance] = useState([]);
  const [value, setValue] = useState(0);
  const [datosAllAvance, setDatosAllAvance] = useState([]);
  const [idEncontrado, setIdEncontrado] = useState(null);
  const USUARIO = localStorage.getItem("USERS");
  const [nombreTarea, setNombreTarea] = useState("");
  const [responsable, setResponsable] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState(null);
  const [selectedIdTarea, setSelectedIdTarea] = useState(null);
  const { noCia, token } = TokenANDnoCia();
  const { ID } = useParams();
  const [tareaDetalles, setTareaDetalles] = useState([]);
  const [datosSubTarea, setDatosSubTarea] = useState([]);
  const [filterSubtarea, setFilterSubtarea] = useState([]);

  useEffect(() => {
    setValue(datosAvance);
  }, [datosAvance]);

  const getData = () => {
    if (sortColumn && sortType) {
      return datosSubTarea.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return datosSubTarea;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const subtareas = getData().filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i <= end;
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(() => {
    //NOTE: PARA CARGAR EL DETALLES--------------->
    const fetchAreaDetails = async () => {
      try {
        const response = await fetch(
          `${API_Services}/TAREA/SelectIdJoin/${noCia}/${ID}`,
          // `${API_Services}/TAREA/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        // console.log(data)
        setTareaDetalles(data);
      } catch (error) {
        console.error(error);
      }
    };

    //BUG: PARA CARGAR LOS DATOS DE LA TABLA SUBTAREA-->
    const getTareaPadre = async () => {
      try {
        const response = await fetch(
          `${API_Services}/TAREA/SelectIdPadre/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        // console.log(data);
        setDatosSubTarea(data);
        setFilterSubtarea(data);
        //--------------------------------------------------------------->
        const responsableResponse = await fetch(
          `${API_Services}/RESPONSABLE/GetLugarResponsable/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const responsableData = await responsableResponse.json();
        setResponsable(responsableData);
      } catch (error) {
        console.log(error);
      }
    };

    getTareaPadre();
    fetchAreaDetails();
  }, [ID, noCia, token]);

  if (!tareaDetalles) {
    return <p>Cargando detalles de tarea...</p>;
  }

  //NOTE: TODOS LOS FORMATOS DE FECHA
  //COMMENT: FORMAT DE FECHA EN EL MODAL
  const formatFechaModal = (fecha) => {
    const [date, time] = fecha.split("T");
    const [año, mes, dia] = date.split("-");
    const formato = [dia, mes, año].join("/");
    const formataedo = `${formato} ${time}`;
    return formataedo;
  };

  //COMMENT: FORMATO DE FECHA EN LA TABLA
  const obtenerFechasDB1 = (fecha) => {
    const fechaFormateada = fecha.split(" ")[0];
    const [dia, mes, anio, ,] = fechaFormateada.split("/");
    const fechaObtenido = `${anio}-${mes}-${dia}`;
    return fechaObtenido;
  };

  //COMMENT: FORMATO DE FECHA EN EL DETALLES
  const obtenerFechasDB = (fecha) => {
    let parts = fecha.split("T")[0].split("-");
    let formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    return formattedDate;
  };

  //COMMENT: FORMATO DE FECHA PARA OBTENER LA ACTUAL
  const getDate = (fechaActual) => {
    const fechaFormateado = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return fechaFormateado;
  };

  //COMMENT: FORMATO DE FECHA PARA RECUPERAR EN LA API CON ORDEN DD/MM/YYYY
  const obtenerFechasAPI = (fecha) => {
    const fechaFormateada = fecha.split(" ")[0];
    const [dia, mes, anio] = fechaFormateada.split("/");
    const fechaObtenida = `${dia}/${mes}/${anio}`;
    return fechaObtenida;
  };

  const eliminarSubTarea = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `${API_Services}/TAREA/${id}`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        setDatosSubTarea(datosSubTarea.filter((item) => item.ID !== id));
        Swal.fire({
          icon: "success",
          title: `${data.msg}`,
          text: "El registro se ha eliminado exitosamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar el equipo.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filterSubtarea.filter(
      (row) =>
        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DIRECTRICES.toLowerCase().includes(searchValue)
    );
    setDatosSubTarea(newData);
    if (searchValue === "") {
      setDatosSubTarea(filterSubtarea);
    }
  };

  const encontrarResponsable = (codigoEmpleado, noCiaRespon) => {
    const found = responsable.find(
      (item) =>
        item.CODIGO_EMPLEADO === codigoEmpleado && item.NO_CIA === noCiaRespon
    );
    if (found) {
      const { NOMBRE } = found;
      return NOMBRE;
    }
    return "No se encontró el responsable";
  };

  const avancesSubtarea = async (id) => {
    const response = await fetch(
      `${API_Services}/AVANCE/Select/${noCia}/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setIdEncontrado(id);
    if (data.length > 0) {
      const avancedata = data[0];
      console.log(avancedata.ID_SUBPROYECTO);
      setDatosAllAvance(data);
    } else {
      console.log("No se encontraron datos del avance");
      toast.info("No se encontraron datos del avance", {
        position: "bottom-center",
        theme: "colored",
      });
      setDatosAllAvance([]);
    }
  };

  const saveAdvance = async () => {
    // debugger;
    if (detalle === "") {
      toast.error("Por favor agrega un detalle", {
        theme: "colored",
      });
      document.getElementById("detalleAvance").classList.add("is-invalid");
      document.getElementById("detalleAvance").classList.remove("is-valid");
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nO_CIA: `${noCia}`,
          iD_SUBPROYECTO: selectedIdSubProyectos,
          iD_TAREA: selectedIdTarea,
          detalle: detalle,
          avance: value,
          usuario: USUARIO,
        }),
      };
      try {
        const response = await fetch(
          `${API_Services}/AVANCE/Insert`,
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        toast.info("Avance guardado correctamente", {
          theme: "colored",
        });
        Swal.fire({
          icon: "success",
          title: "Avance guardado",
          text: "El Avance se ha guardado correctamente",
        }).then(() => {
          handleClose();
          // return usenavigate("/tarea");
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById("detalleAvance").classList.remove("is-invalid");
      document.getElementById("detalleAvance").classList.add("is-valid");
    }
  };

  return (
    <div className="container mt-4 mb-5 contCreateActivi">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Detalles de Tarea</span>
        </div>

        <div className="col-md-12">
          <div
            className="tab-content shadow"
            style={{ borderRadius: "15px", padding: "2em 4rem" }}
          >
            <div className="d-flex mb-3 justify-content-end">
              <Link
                to={`/detallessubtarea/${ID}`}
                className="btn btnCrea btn-success text-decoration-none"
              >
                <AiOutlinePlus /> Agregar subtarea
              </Link>
            </div>

            <div className="row  ">
              {/* <form onSubmit={handleInputChange} className="formuTarea"> */}
              <form>
                {tareaDetalles.map((tarea) => (
                  <div key={tarea.ID}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span>
                            <strong>Tarea:</strong> {tarea.NOMBRE_TAREA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Proyecto:</strong> {tarea.PROYECTO}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Subproyecto:</strong> {tarea.SUBPROYECTO}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Etapa: </strong> {tarea.NOMBRE_ETAPA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Area: </strong> {tarea.NOMBRE_AREA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Subarea: </strong> {tarea.NOMBRE_SUBAREA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Equipo: </strong> {tarea.NOMBRE_EQUIPO}
                          </span>
                        </div>
                      </div>

                      {/* <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Parte: </strong> {tarea. }
                          </span>
                        </div>
                      </div> */}

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Tarea Padre: </strong> {tarea.ID_TAREAPADRE}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Actividad: </strong>
                            {tarea.NOMBRE_ACTIVIDAD}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Directrices: </strong>
                            {tarea.DIRECTRICES}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Fecha Inicio Real: </strong>
                            {obtenerFechasDB(tarea.FECHA_INICIO)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong> Fecha Inicio Proyectada: </strong>
                            {obtenerFechasDB(tarea.FECHA_INICIOPROYECTADA)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Fecha Fin Real: </strong>
                            {obtenerFechasDB(tarea.FECHA_FIN)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Fecha Fin Proyectada: </strong>
                            {obtenerFechasDB(tarea.FECHA_INICIOPROYECTADA)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Responsable: </strong>
                            {tarea.NOMBRE}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Departamento Encargado: </strong>
                            {tarea.DEPTO_RESPONSABLE}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Lugar de Advertencia: </strong>
                            {tarea.LUGARADVERTENCIA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>Descripción Advertencia:</strong>
                            {tarea.DESCRIPCION_ADVERTENCIA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span htmlFor="form-label">
                            <strong>Puntuación: </strong>
                            {tarea.PUNTUACION}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline">
                          <span htmlFor="form-label">
                            <strong>Avance: </strong> {tarea.AVANCE}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>

            <div className="row">
              <div className="d-flex   mb-4 justify-content-end">
                <FormControl
                  type="search"
                  placeholder="Buscar"
                  className="inpuBuscar"
                  style={{ width: "20%" }}
                  onChange={handleFilter}
                />
              </div>
            </div>

            <Table
              appearance={"primary"}
              height={400}
              data={subtareas}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={loading}
              bordered
              renderEmpty={() => {
                return (
                  <div className="rs-table-body-info">
                    No hay registros para mostrar{" "}
                  </div>
                );
              }}
              autoHeight
              affixHeader
              affixHorizontalScrollbar
            >
              {/* <Column width={60} align="center" fixed sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  ID
                </HeaderCell>
                <Cell dataKey="ID" />
              </Column> */}

              <Column width={190} fixed sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  NOMBRE
                </HeaderCell>
                <Cell>
                  {(row) => {
                    return (
                      <p
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${row.DIRECTRICES}</p></div>`}
                      >
                        {row.NOMBRE}
                      </p>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={190} resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  AVANCE
                </HeaderCell>
                <Cell>
                  {(row) => {
                    // const status =
                    //   row.AVANCE === 100
                    //     ? "success"
                    //     : row.AVANCE < 20
                    //     ? "fail"
                    //     : "active";
                    let status = "";
                    if (
                      obtenerFechasAPI(row.FECHA_FINPROYECTADA) <
                        getDate(new Date()) &&
                      row.AVANCE < 100
                    ) {
                      status = "#f44336";
                    } else if (row.AVANCE === 100) {
                      status = "#4caf50";
                    } else {
                      status = "#3498ff";
                    }
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${row.DIRECTRICES}</p></div>`}
                      >
                        {" "}
                        <Progress.Line percent={row.AVANCE} strokeColor={status} />
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={200} sortable resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  FECHA INICIO PROYECTADA
                </HeaderCell>
                <Cell>
                  {(rowData) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${rowData.DIRECTRICES}</p></div>`}
                      >
                        {obtenerFechasDB1(rowData.FECHA_INICIOPROYECTADA)}
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={200} sortable resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  FECHA FIN PROYECTADA
                </HeaderCell>
                <Cell>
                  {(rowData) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${rowData.DIRECTRICES}</p></div>`}
                      >
                        {obtenerFechasDB1(rowData.FECHA_FINPROYECTADA)}
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={250} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  RESPONSABLE
                </HeaderCell>
                <Cell>
                  {(row) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${row.DIRECTRICES}</p></div>`}
                      >
                        {encontrarResponsable(
                          row.ID_RESPONSABLE,
                          row.NO_CIARESPONSABLE
                        )}
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={230} fixed="right" align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  ACCIONES
                </HeaderCell>
                <Cell style={{ padding: "6px" }}>
                  {(rowData) => (
                    <td>
                      <Button
                        // to={`/editarEmployees/${rowData.id}`}
                        size="sm"
                        color="blue"
                        appearance="primary"
                        onClick={() => {
                          usenavigate(`/editarSubtarea/${ID}/${rowData.ID}/1`);
                        }}
                      >
                        Editar
                      </Button>{" "}
                      <Button
                        size="sm"
                        color="red"
                        appearance="primary"
                        onClick={() => {
                          Swal.fire({
                            title: "¿Está seguro de eliminar este registro?",
                            text: "Esta acción no se puede deshacer",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#28a745",
                            cancelButtonColor: "#dc3545",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar",
                            reverseButtons: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              eliminarSubTarea(rowData.ID);
                            } else if (
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              Swal.fire(
                                "Cancelado",
                                "El registro está segura 🗃",
                                "error"
                              );
                            }
                          });
                        }}
                      >
                        Eliminar
                      </Button>{" "}
                      {""}
                      <Button
                        size="sm"
                        color="cyan"
                        appearance="primary"
                        onClick={() => {
                          handleOpen("lg");
                          // debugger
                          avancesSubtarea(`${rowData.ID}`);
                          setSelectedIdSubProyectos(rowData.ID_SUBPROYECTO);
                          setSelectedIdTarea(rowData.ID);
                          setNombreTarea(rowData.NOMBRE);
                          setDatosAvance(rowData.AVANCE);
                        }}
                      >
                        Avance
                      </Button>
                    </td>
                  )}
                </Cell>
              </Column>
            </Table>

            <div style={{ padding: 20 }}>
              <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                layout={["total", "-", "limit", "|", "pager", "skip"]}
                total={datosSubTarea.length}
                limitOptions={[5, 10, 15, 50]}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
              />
            </div>

            <Modal
              backdrop="static"
              keyboard={false}
              size={size}
              open={open}
              onClose={handleClose}
            >
              <Modal.Header>
                {/* <Modal.Title>Modal Title</Modal.Title> */}
                <h5 className="text-center">Registro de avance</h5>
              </Modal.Header>
              <Modal.Body>
                {/* <Placeholder.Paragraph /> */}

                <div className="container border">
                  <div className="row">
                    <div className="col-md-7">
                      <div>
                        <strong>ID:</strong> {idEncontrado}
                      </div>
                      <div>
                        <strong>Tarea: </strong> {nombreTarea}
                      </div>
                      <div>
                        <strong>Consultor:</strong>
                      </div>
                      <div className="h5 mt-2">
                        <strong>Avance: </strong> {datosAvance} %
                      </div>

                      <div className="row">
                        <div className="col-md-9">
                          <Slider
                            progress
                            style={{ marginTop: 16 }}
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                          />
                        </div>

                        <div className="col-md-3">
                          <InputNumber
                            min={0}
                            max={100}
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-outline mb-5">
                        <label className="form-label">Detalle</label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="detalleAvance"
                          name="detalleAvance"
                          value={detalle}
                          onChange={(e) => {
                            setDetalle(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="border-left p-4">
                        <div className="mb-2">
                          <h5>Bitacora</h5>
                          {datosAllAvance.map((item) => (
                            <div key={item.ID} className="mb-3">
                              <div>
                                <strong> Fecha: </strong>
                                {formatFechaModal(item.FECHA_HORA)}
                              </div>
                              <div>
                                <strong>Detalle:</strong> {item.DETALLE}
                              </div>

                              <div>
                                <strong>Avance:</strong> {item.AVANCE}%
                              </div>
                              <div>
                                <strong>Usuario:</strong> {item.USUARIO}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      saveAdvance();
                    }}
                    color="green"
                    appearance="primary"
                  >
                    Guardar
                  </Button>
                  <Button onClick={handleClose} appearance="subtle">
                    Cerrar
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            <div className="row d-flex justify-content-center mt-3">
              <div className="col-md-6 d-flex justify-content-center">
                <Link
                  to="/tarea"
                  type="submit"
                  className="btnActivity btn w-75 btn-outline-danger btn-block text-decoration-none"
                >
                  <IoArrowBackOutline /> Regresar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tooltip
        id="my-tooltip"
        style={{ width: "450px", textAlign: "center", zIndex: 2 }}
      />
      <ToastContainer />
    </div>
  );
};

export default DetailsTarea;
