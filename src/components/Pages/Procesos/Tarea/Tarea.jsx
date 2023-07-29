//BUG: LINK DE LA LIBRERAIA CON REACT https://rsuitejs.com/components/table/
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Table,
  Modal,
  Button,
  Pagination,
  Slider,
  Progress, 
  InputNumber
} from "rsuite";
import "rsuite/dist/rsuite.css";
import { API_Services } from "../../../Config/APIService";
import { TokenANDnoCia } from "../../../Utilities/TokenANDnoCia";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

const Tarea = (props) => {
  const usenavigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [responsable, setResponsable] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState(null);
  const [selectedIdTarea, setSelectedIdTarea] = useState(null);
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
  const { noCia, token } = TokenANDnoCia();
  const [datosAllAvance, setDatosAllAvance] = useState([]);
  const [tarea, setTarea] = useState([]);
  const [filterTarea, setFilterTarea] = useState([]);
  const [filtrarPor, setFiltrarPor] = useState("T");
  const [idEncontrado, setIdEncontrado] = useState(null);
  const USUARIO = localStorage.getItem("USERS");
  const [nombreTarea, setNombreTarea] = useState("");

  useEffect(() => {
    if (Object.keys(props).length != 0) {
      setTarea(props.data);
      setFilterTarea(props.data);
      setFiltrarPor(props.TareaStatus);
    }
  }, [props]);

  useEffect(() => {
    setValue(datosAvance);
  }, [datosAvance]);

  const getData = () => {
    if (sortColumn && sortType) {
      return tarea.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return tarea;
  };


  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const tareas = getData().filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i <= end;
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(() => {
    const API_TAREA = async () => {
      try {
        const response = await fetch(
          `${API_Services}/TAREA/Select/${noCia}/T`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setTarea(data);
        setFilterTarea(data);

        const responsableResponse = await fetch(
          `${API_Services}/RESPONSABLE/GetLugarResponsable/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const responsableData = await responsableResponse.json();
        setResponsable(responsableData);
      } catch (error) {
        console.log(error)
      }
    };
    API_TAREA();
  }, [noCia, token]);

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

  const deleteTarea = async (id) => {
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
        setTarea(tarea.filter((item) => item.ID !== id));
        Swal.fire({
          icon: "success",
          title: `${data.msg}`,
          text: "Tarea eliminado exitosamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar.",
        });
      }
    } catch (error) {
      
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filterTarea.filter(
      (item) =>
        item.NOMBRE.toLowerCase().includes(searchValue) ||
        item.DESCIPCION_ADVERTENCIA.toLowerCase().includes(searchValue) ||
        item.NOMBRE_PROYECTO.toLowerCase().includes(searchValue) ||
        item.NOMBRE_SUBPROYECTO.toLowerCase().includes(searchValue)
    );
    setTarea(newData);
    if (searchValue === "") {
      setTarea(filterTarea);
    }
  };

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

  const avances = async (id) => {
    const response = await fetch(
      `${API_Services}/AVANCE/Select/${noCia}/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setIdEncontrado(id);
    if (data.length > 0) {
      const avancedata = data[0];
      
      setDatosAllAvance(data);
    } else {
   
      toast.info("No se encontraron datos del avance", {
        position: "bottom-center",
        theme: "colored",
      });
      setDatosAllAvance([]);
    }
  };

  const saveAdvance = async () => {
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
        toast.info("Avance guardado correctamente", {
          theme: "colored",
        });
        Swal.fire({
          icon: "success",
          title: "Avance guardado",
          text: "El Avance se ha guardado correctamente",
        }).then(() => {
          handleClose();
          
          window.location.reload();
        });
      } catch (error) {
        
      }
      document.getElementById("detalleAvance").classList.remove("is-invalid");
      document.getElementById("detalleAvance").classList.add("is-valid");
    }
  };

  const getDate = (fechaActual) => {
    const fechaFormateado = fechaActual.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return fechaFormateado;
  };

  const obtenerFechasDB = (fecha) => {
    const fechaFormateada = fecha.split(" ")[0];
    const [dia, mes, anio] = fechaFormateada.split("/");
    const fechaObtenida = `${dia}/${mes}/${anio}`;
    return fechaObtenida;
  };

  const TareasFilter = async (filter) => {
    try {
      const response = await fetch(
        `${API_Services}/TAREA/Select/${noCia}/${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();

      setTarea(data);
      setFilterTarea(data);
    } catch (error) {
      
    }
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFiltrarPor(filterValue);
    TareasFilter(filterValue);
  };

  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Tareas</span>
        </div>
        <div className="col-md-12 mb-5">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between  ">
              <div className="">
                <Link
                  to="/createTarea"
                  className="btn btnCrea btn-success text-decoration-none"
                  style={{ width: "100%" }}
                >
                  <AiOutlinePlus /> Registrar Tarea
                </Link>
              </div>

              <div className="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={filtrarPor}
                  onChange={handleFilterChange}
                >
                  <option selected disabled>
                    Filtrar por
                  </option>
                  <option value="T">Todo</option>
                  <option value="F">Finalizadas</option>
                  <option value="N">No Iniciadas</option>
                  <option value="A">Atrasadas</option>
                </select>
              </div>

              <div className="">
                <FormControl
                  type="search"
                  placeholder="Buscar Tarea"
                  className="inpuBuscar"
                  style={{ width: "100%" }}
                  onChange={handleFilter}
                />
              </div>
            </div>

            <Table
              appearance={"primary"}
              height={400}
              data={tareas}
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
              <Column width={190} fixed sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  NOMBRE
                </HeaderCell>
                {/* <Cell dataKey="NOMBRE" /> */}
                <Cell dataKey="NOMBRE">
                  {(row) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        // data-tooltip-content={`${row.DIRECTRICES}`}
                        data-tooltip-place="bottom"
                        // data-tooltip-variant="success"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${row.DIRECTRICES}</p><br/> <span>Total Subtareas: ${row.TOTAL_SUBTAREAS}</span> </div>`}
                      >
                        {row.NOMBRE}
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={100} sortable resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  PLANTA
                </HeaderCell>
                <Cell dataKey="NOMBRE_SUBPROYECTO">
                  {(rowData) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${rowData.DIRECTRICES}</p><br/> <span>Total Subtareas: ${rowData.TOTAL_SUBTAREAS}</span> </div>`}
                      >
                        {rowData.NOMBRE_SUBPROYECTO}
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={190} sortable resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  AVANCE
                </HeaderCell>
                {/* <Cell>
                  {(row) => {
                    const status = row.AVANCE === 100 ? "success" : "active";
                    return (
                      <Progress.Line percent={row.AVANCE} status={status} />
                    );
                  }}
                </Cell> */}
                <Cell dataKey="AVANCE">
                  {(row) => {
                    // const status =
                    //   row.AVANCE === 100
                    //     ? "success"
                    //     : row.AVANCE < 20
                    //     ? "fail"
                    //     : "active";

                    let status = "";
                    if (
                      obtenerFechasDB(row.FECHA_FINPROYECTADA) <
                        getDate(new Date()) &&
                      row.AVANCE < 100
                    ) {
                      // status = "fail";
                      status = "#f44336";
                    } else if (row.AVANCE === 100) {
                      // status = "success";
                      status = "#4caf50";
                    } else {
                      // status = "active";
                      status = "#3498ff";
                    }

                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${row.DIRECTRICES}</p><br/> <span>Total Subtareas: ${row.TOTAL_SUBTAREAS}</span> </div>`}
                      >
                        {" "}
                        <Progress.Line
                          percent={row.AVANCE}
                          strokeColor={status}
                        />
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={200} sortable resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  FECHA INICIO PROYECTADA
                </HeaderCell>
                <Cell dataKey="FECHA_INICIOPROYECTADA">
                  {(rowData) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${rowData.DIRECTRICES}</p><br/> <span>Total Subtareas: ${rowData.TOTAL_SUBTAREAS}</span> </div>`}
                      >
                        {obtenerFechasDB1(rowData.FECHA_INICIOPROYECTADA)}
                      </div>
                    );
                  }}
                </Cell>
              </Column>

              <Column width={180} sortable resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  FECHA FIN PROYECTADA
                </HeaderCell>
                <Cell dataKey="FECHA_FINPROYECTADA">
                  {(rowData) => {
                    return (
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${rowData.DIRECTRICES}</p><br/> <span>Total Subtareas: ${rowData.TOTAL_SUBTAREAS}</span> </div>`}
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
                        data-tooltip-html={`<div><strong>DESCRIPCION</strong><p>${row.DIRECTRICES}</p><br/> <span>Total Subtareas: ${row.TOTAL_SUBTAREAS}</span> </div>`}
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

              <Column width={334} fixed="right" align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  ACCIONES
                </HeaderCell>
                <Cell style={{ padding: "6px" }}>
                  {(rowData) => (
                    <td>
                      <Button
                        size="sm"
                        color="yellow"
                        appearance="primary"
                        onClick={() => {
                          handleOpen();
                          usenavigate(`/detailsTarea/${noCia}/${rowData.ID}`);
                        }}
                      >
                        Subtareas
                      </Button>{" "}
                      {""}
                      <Button
                        // to={`/editarEmployees/${rowData.id}`}
                        size="sm"
                        color="blue"
                        appearance="primary"
                        onClick={() => {
                          usenavigate(`/editarTarea/${rowData.ID}`);
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
                              if (rowData.TOTAL_SUBTAREAS > 0) {
                                Swal.fire({
                                  title: "Error al eliminar",
                                  text: "El registro no se puede eliminar porque tiene subtareas🗃",
                                  icon: "error",
                                });
                              } else {
                                deleteTarea(rowData.ID);
                              }
                            } else if (
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              Swal.fire(
                                "Cancelado",
                                "El registro está seguro 🗃",
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
                        onClick={() => {
                          handleOpen("lg");
                          avances(`${rowData.ID}`);
                          setSelectedIdSubProyectos(rowData.ID_SUBPROYECTO);
                          setSelectedIdTarea(rowData.ID);
                          setNombreTarea(rowData.NOMBRE);
                          setDatosAvance(rowData.AVANCE);
                        }}
                        size="sm"
                        color="cyan"
                        disabled={rowData.TOTAL_SUBTAREAS > 0}
                        appearance="primary"
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
                total={tarea.length}
                limitOptions={[5, 10, 15, 50]}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
              />
            </div>
          </div>
        </div>
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
      <Tooltip
        id="my-tooltip"
        style={{ width: "450px", textAlign: "center", zIndex: 2 }}
      />
      <ToastContainer />
    </div>
  );
};

Tarea.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Tarea;
