import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import { API_Services } from "../../../../Config/APIService";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const DetailsTarea = () => {
  const { noCia, token } = TokenANDnoCia();
  const { ID } = useParams();
  const [tareaDetalles, setTareaDetalles] = useState([]);
  const [datosSubTarea, setDatosSubTarea] = useState([]);
  const [filterSubtarea, setFilterSubtarea] = useState([]);

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
        setDatosSubTarea(data);
        setFilterSubtarea(data);
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

  const obtenerFechasDB1 = (fecha) => {
    const fechaFormateada = fecha.split(" ")[0];
    const [dia, mes, anio, ,] = fechaFormateada.split("/");
    const fechaObtenido = `${anio}-${mes}-${dia}`;
    return fechaObtenido;
  };
  
  const obtenerFechasDB = (fecha) => {
    let parts = fecha.split("T")[0].split("-");
    let formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    return formattedDate;
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
      width: "50px",
    },
    {
      name: "NOMBRE",
      selector: (row) => row.NOMBRE,
      sortable: true,
      width: "200px",
    },

    {
      name: "DIRECTRICES",
      selector: (row) => row.DIRECTRICES,
      sortable: true,
      width: "150px",
    },

    {
      name: "FECHA_INICIO",
      selector: (row) => obtenerFechasDB1(row.FECHA_INICIO),
      sortable: true,
      width: "150px",
    },

    {
      name: "FECHA_FIN",
      selector: (row) => obtenerFechasDB1(row.FECHA_FIN),
      sortable: true,
      width: "150px",
    },

    {
      name: "ACCIONES",
      width: "200px",
      cell: (row) => (
        <td>
          <Link
            to={`/editarSubtarea/${ID}/${row.ID}/1`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              Swal.fire({
                title: "¿Está seguro de eliminar la actividad?",
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
                  eliminarSubTarea(row.ID);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire("Cancelado", "La actividad está segura 🗃", "error");
                }
              });
            }}
          >
            <AiTwotoneDelete /> Eliminar
          </button>
        </td>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: "2px solid #dbdbdb",
      },
    },

    headRow: {
      style: {
        backgroundColor: "#dbdbdb",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "13px",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "8px",
        paddingRight: "8px",
        textAlign: "center",
      },
    },
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

  const CustomNoDataComponent = () => (
    <div className="alert alert-danger w-100 text-center m-0" role="alert">
      No hay registros para mostrar
    </div>
  );

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
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
                className="btn btnCrea btn-success"
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
                            <strong>NOMBRE:</strong> {tarea.NOMBRE_TAREA}
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
                            <strong>DIRECTRICES: </strong>
                            {tarea.DIRECTRICES}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>FECHA INICIO REAL: </strong>
                            {obtenerFechasDB(tarea.FECHA_INICIO)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>FECHA INICIO PROYECTADA: </strong>
                            {obtenerFechasDB(tarea.FECHA_INICIOPROYECTADA)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>FECHA FIN REAL: </strong>
                            {obtenerFechasDB(tarea.FECHA_FIN)}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span className="form-label">
                            <strong>FECHA FIN PROYECTADA: </strong>
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
                            <strong>Departamento encargado: </strong>
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
                            <strong>DESCIPCION ADVERTENCIA:</strong>
                            {tarea.DESCRIPCION_ADVERTENCIA}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <span htmlFor="form-label">
                            <strong>PUNTUACIÓN: </strong>
                            {tarea.PUNTUACION}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline">
                          <span htmlFor="form-label">
                            <strong>AVANCE: </strong> {tarea.AVANCE}
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

              <DataTable
                columns={columns}
                data={datosSubTarea}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                fixedHeader
                customStyles={customStyles}
                noDataComponent={<CustomNoDataComponent />}
                highlightOnHover
                rowExpandible
              />
            </div>

            <div className="row d-flex justify-content-center mt-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTarea;
