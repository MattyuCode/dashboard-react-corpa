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
  InputNumber,
} from "rsuite";
import "rsuite/dist/rsuite.css";
import { API_Services } from "../../../Config/APIService";
import { TokenANDnoCia } from "../../../Utilities/TokenANDnoCia";

const Tarea = () => {
  const usenavigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
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
  const [value, setValue] = useState(0);
  const { noCia, token } = TokenANDnoCia();
  const [datosAvance, setDatosAvance] = useState([]);
  const [datosAllAvance, setDatosAllAvance] = useState([]);
  const [tarea, setTarea] = useState([]);
  const [filterTarea, setFilterTarea] = useState([]);
  const [idEncontrado, setIdEncontrado] = useState(null);
  const USUARIO = localStorage.getItem("USERS");
  const [nombreTarea, setNombreTarea] = useState("");

  const getData = () => {
    if (sortColumn && sortType) {
      return tarea.sort((a, b) => {
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
        const response = await fetch(`${API_Services}/TAREA/Select/${noCia}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTarea(data);
        setFilterTarea(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    API_TAREA();
  }, [noCia, token]);

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
      console.log(error.message);
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

  const avances = async (id) => {
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
    }
  };

  const saveAdvance = async () => {
    // debugger;
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
      toast.info("Avance guardado exitosamente", {
        theme: "colored",
      });
      Swal.fire({
        icon: "success",
        title: "Avance guardada",
        text: "El Avance se ha guardado exitosamente",
      }).then(() => {
        handleClose();
        // return usenavigate("/tarea");
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Tareas</span>
        </div>
        <div className="col-md-12 mb-5">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/createTarea" className="btn btnCrea btn-success">
                <AiOutlinePlus /> Registrar Tarea
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar Tarea"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
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
              <Column width={60} align="center" fixed sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  ID
                </HeaderCell>
                <Cell dataKey="ID" />
              </Column>

              <Column width={200} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  NOMBRE
                </HeaderCell>
                <Cell dataKey="NOMBRE" />
              </Column>

              <Column width={300} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  DESCRIPCIÓN
                </HeaderCell>
                <Cell dataKey="DESCIPCION_ADVERTENCIA" />
              </Column>

              <Column width={100} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  EQUIPO
                </HeaderCell>
                <Cell dataKey="NOMBRE_EQUIPO" />
              </Column>

              <Column width={250} resizable align="center">
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  AVANCE
                </HeaderCell>
                <Cell>
                  {(row) => {
                    const status = row.AVANCE === 100 ? "success" : "active";
                    return (
                      <Progress.Line percent={row.AVANCE} status={status} />
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
                              deleteTarea(rowData.ID);
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
                          avances(`${rowData.ID}`);
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
                  <strong>Consultor:</strong> 1
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
                    id="descripcion"
                    name="descripcion"
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
                          {item.FECHA_HORA}
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
      <ToastContainer />
    </div>
  );
};

export default Tarea;
