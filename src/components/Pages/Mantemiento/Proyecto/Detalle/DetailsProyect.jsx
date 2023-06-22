import { useEffect, useState } from "react";
//import "./CreateProyecto.css";

import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";

import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { FormControl } from "react-bootstrap";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

// import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsProyect = () => {
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  var [bool, setBool] = useState(true);

  var { ID } = useParams();

  const [proyect, setProyect] = useState([]);
  const [filteredProyect, setFilteredActVidad] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");
  const Token = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const API_SUBPROYECTO = async (accessToken) => {
    try {
      const url = `${axios.getUri()}/api/PROYECTO/Select/${localStorage.getItem(
        "NO_CIA"
      )}/${ID}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();

      document.getElementById("descripcion").value = data[0]["DESCRIPCION"];
      setDate1(new Date(DecodeformatDate(data[0]["INICIO"])));
      setDate2(new Date(DecodeformatDate(data[0]["FIN"])));
      //  setDescripcion(data[0]["DESCRIPCION"]);

      setUsuarioCrea(data[0]["USUARIO_CREA"]);
      setEstado(data[0]["ESTADO"]);
    } catch (error) {
      console.log(error);
    }
  };
  if (bool) {
    API_SUBPROYECTO(token);
    setBool(false);
  }

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.NOMBRE,

      sortable: true,
      width: "200px",
    },

    {
      name: "DESCRIPCION",
      //selector: (row) => row.ID,
      selector: (row) => row.DESCRIPCION,
      sortable: true,
      width: "200px",
    },

    {
      name: "FECHA_INICIO",
      //selector: (row) => row.ID,

      selector: (row) => formatDate(row.FECHA_INICIO),
      sortable: true,
      width: "150px",
    },

    {
      name: "FECHA_FIN",
      //selector: (row) => row.ID,
      selector: (row) => formatDate(row.FECHA_FIN),
      sortable: true,
      width: "150px",
    },

    {
      name: "ACCIONES",
      width: "200px",
      cell: (row) => (
        <td>
          {/*<Link
            to={`/DetailsProyect/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "} */}
          &nbsp;
          <Link
            to={`/crearSubProyecto/${ID}/${row.ID}/1`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              delete_Proyect(row.ID);
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
    // tableWrapper: {
    //   style: {
    //     display: 'table',
    //   },
    // },
    headRow: {
      style: {
        backgroundColor: "#dbdbdb",
        // borderRadius: "5px",
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
        // backgroundColor: "#dbdbdb",
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

  useEffect(() => {
    const API_Proyect = async (accessToken) => {
      try {
        const url = `${axios.getUri()}/api/SUBPROYECTO/Select/${localStorage.getItem(
          "NO_CIA"
        )}/${ID}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setProyect(data);
        // console.log(data);
        setFilteredActVidad(data);
        // setTotalRows(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    API_Proyect(token);
  }, [token, noCia]);

  // API PARA ELIMINAR UN ID DE LA ACTIVIDA
  const delete_Proyect = async (id) => {
    Swal.fire({
      title: "Desea Eliminar el Registro?",
      text: "Esta Accion no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/SUBPROYECTO/${id}`, Token)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Registro Eliminado!",
              showConfirmButton: false,
              timer: 1500,
            });
            setProyect(proyect.filter((item) => item.ID !== id));
          })
          .catch(function (error) {
            if (error.request["status"] == 404) {
              Swal.fire({
                icon: "error",
                title:
                  "No espoble eliminar este regisgro porque contiene dependencias",
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: error.request["status"],
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filteredProyect.filter(
      (row) =>
        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DESCRIPCION.toLowerCase().includes(searchValue) ||
        row.FECHA_INICIO.toLowerCase().includes(searchValue) ||
        row.FECHA_FIN.toLowerCase().includes(searchValue)
    );
    setProyect(newData);
    if (searchValue === "") {
      setProyect(filteredProyect);
    }
  };

  return (
    /*finaliza el formlulario */

    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Proyectos</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">
            <div className="col-md-12">
              <div
                className="tab-content shadow"
                style={{ borderRadius: "15px" }}
              >
                <div className="row  ">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <div>
                          <label className="form-label">FECHA INICIO</label>
                          <DatePicker
                            selected={date1}
                            onChange={(date) => setDate1(date)}
                            locale="es"
                            showIcon
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            id="fechainicio"
                            isClearable
                            placeholderText="dd/mm/yy"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">FECHA FIN</label>
                        <DatePicker
                          selected={date2}
                          onChange={(date) => setDate2(date)}
                          locale="es"
                          showIcon
                          dateFormat="dd/MM/yyyy"
                          isClearable
                          placeholderText="dd/mm/yy"
                          className="form-control"
                          id="fechafin"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-5">
                      <div className="form-outline">
                        <label className="form-label">DESCRIPCION</label>
                        <textarea
                          type="text"
                          id="descripcion"
                          className="form-control"
                          name="descripcion"
                        />
                      </div>
                    </div>
                  </div>

                  {/*tabla inicio */}

                  <div className="d-flex mb-3 justify-content-between">
                    <Link
                      to={"/crearSubProyecto/" + ID + "/0/0"}
                      className="btn btnCrea btn-success"
                    >
                      <AiOutlinePlus />
                      &nbsp;
                    </Link>

                    <FormControl
                      type="search"
                      placeholder="Buscar SubProyecto"
                      className="inpuBuscar"
                      style={{ width: "20%" }}
                      onChange={handleFilter}
                    />
                  </div>
                  <DataTable
                    columns={columns}
                    data={proyect}
                    // data={rows}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader
                    customStyles={customStyles}
                    // progressPending={pending}
                    // progressComponent={<BiLoader />}
                    noDataComponent={<CustomNoDataComponent />}
                    highlightOnHover
                    rowExpandible
                  />
                </div>

                <div className="row d-flex justify-content-center">
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link
                      to="/proyecto"
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
      </div>
    </div>
  );
};
{
  /*tabla fin */
}
export default DetailsProyect;
const formatDate = (date) => {
  const fecha = date.split(" "); // string con la fecha en formato YYYY-MM-DD
  const parts = fecha[0].split("/");

  const fechaObjeto = parts[0] + "-" + parts[1] + "-" + parts[2];
  return fechaObjeto;
};
const DecodeformatDate = (date) => {
  const fecha = date.split(" "); // string con la fecha en formato YYYY-MM-DD
  const parts = fecha[0].split("/");

  const fechaObjeto = parts[2] + "-" + parts[1] + "-" + parts[0] + "T00:00:00";
  return fechaObjeto;
};
