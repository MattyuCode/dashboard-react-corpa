import { useEffect, useState } from "react";
//import "./CreateProyecto.css";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";

import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { FormControl } from "react-bootstrap";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";





// import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsProyect = () => {

  const [redirect, setRedirect] = useState(false);


  var { ID } = useParams();
  const usenavigate = useNavigate();







  const [proyect, setProyect] = useState([]);
  const [filteredProyect, setFilteredActVidad] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");
  const Token = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const [Listsubproyect, setSubProyecto] = useState([]);


  const API_SUBPROYECTO = async (accessToken) => {
    try {
      const url =
        `${axios.getUri()}/api/PROYECTO/Select/${localStorage.getItem("NO_CIA")}/${ID}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      document.getElementById("descripcion").value = data[0]["DESCRIPCION"];
      document.getElementById("fechainicio").value = DecodeformatDate(data[0]["INICIO"]);
      document.getElementById("fechafin").value = DecodeformatDate(data[0]["FIN"]);
      //  setDescripcion(data[0]["DESCRIPCION"]);

      setUsuarioCrea(data[0]["USUARIO_CREA"]);
      setEstado(data[0]["ESTADO"]);

    } catch (error) {
      console.log(error);
    }
  };
  API_SUBPROYECTO(token);











  const columns = [

    {
      name: "NOMBRE",
      selector: (row) => row.NOMBRE,

      sortable: true,
      // width: "300px",
    },

    {
      name: "DESCRIPCION",
      //selector: (row) => row.ID,
      selector: (row) => row.DESCRIPCION,
      sortable: true,
      width: "200px",

    },

    {
      name: "FECHA INICIO",
      //selector: (row) => row.ID,
      
      selector: (row) =>formatDate( DecodeformatDate(row.FECHA_INICIO)),
      sortable: true,
      width: "200px",

    },

    {
      name: "FECHA INICIO",
      //selector: (row) => row.ID,
      selector: (row) => formatDate( DecodeformatDate(row.FECHA_FIN)),
      sortable: true,
      width: "200px",

    },

    {
      name: "ACCIONES",
      cell: (row) => (
        <td>
          <Link
            to={`/DetailsProyect/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
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
        const url = `${axios.getUri()}/api/SUBPROYECTO/Select/${localStorage.getItem("NO_CIA")}/${ID}`;
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
      title: 'Desea Eliminar el Registro?',
      text: "Esta Accion no se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/SUBPROYECTO/${id}`, Token)
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Registro Eliminado!',
              showConfirmButton: false,
              timer: 1500,

            })
            setProyect(proyect.filter((item) => item.ID !== id));
          },)
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: error.request["status"],
              showConfirmButton: false,
              timer: 1500
            })
          });
      }
    })




  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filteredProyect.filter(
      (row) =>

        row.DESCRIPCION.toLowerCase().includes(searchValue)
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
            <h1>hola mundo</h1>






            <div className="col-md-12">
              <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
                <div className="row  ">


                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">FECHA INICIO</label>
                        <input
                          type="date"
                          id="fechainicio"
                          className="form-control"
                          name="nombre"

                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">FECHA fin</label>
                        <input
                          type="date"
                          id="fechafin"
                          className="form-control"
                          name="fechafin"

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

                  {/*tabla fin */}



                  <h1>hola mundo</h1>

                  <div className="d-flex mb-3 justify-content-between">


                    <Link to={"/crearSubProyecto/"+ID+"/0/0"} className="btn btnCrea btn-success">
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

export default DetailsProyect;
const formatDate = (date) => {
  
  const fecha = date;  // string con la fecha en formato YYYY-MM-DD
  const parts = fecha.split("-");
  const fechaObjeto = parts[2] + "/" + parts[1] + "/" + parts[0];
  return fechaObjeto;

}
const DecodeformatDate = (date) => {
  debugger;

  const fecha = date.split(" ");// string con la fecha en formato YYYY-MM-DD
  const parts = fecha[0].split("/");

  const fechaObjeto = parts[2] + "-" + parts[1] + "-" + parts[0];
  return fechaObjeto;

}

