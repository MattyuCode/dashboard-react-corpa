import { useEffect, useState } from "react";
//import "./Actividad.css";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { FormControl } from "react-bootstrap";
import axios from 'axios';


// import 'bootstrap/dist/css/bootstrap.min.css';

const SubArea = () => {
  const [subarea, setSubArea] = useState([]);
  const [filteredProyect, setFilteredActVidad] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");
  const Token = {
    headers: { Authorization: `Bearer ${token}` }
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
      name: "DESCRIPCION",
      selector: (row) => row.DESCRIPCION,

      sortable: true,
      width: "150px",

    },
    {
      name: "AREA",
      selector: (row) => row.NOMBRE_AREA,

      sortable: true,
      width: "150px",

    },
    {
      name: "PROYECTO",
      selector: (row) => row.NOMBRE_PROYECTO,
      sortable: true,
      width: "150px",

    },
    {
      name: "SUBPROYECTO",
      selector: (row) => row.NOMBRE_SUBPROYECTO,

      sortable: true,
      width: "175px",

    },

    {
      name: "ACCIONES",
      width: "300px",
      cell: (row) => (
        <td>
          <Link
            to={`/DetailsSubArea/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
          &nbsp;
          <Link
            to={`/crearSubArea/${row.ID}`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              delete_SubArea(row.ID);

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
        const url = `${axios.getUri()}/api/SUBAREA/Select/${noCia}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setSubArea(data);
        // console.log(data);
        setFilteredActVidad(data);
        // setTotalRows(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    API_Proyect(token);
  }, []);

  // API PARA ELIMINAR UN ID DE LA ACTIVIDA
  const delete_SubArea = async (id) => {

    Swal.fire({
      title: 'Desea Eliminar el Registro?',
      text: "Esta Acción no se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/SUBAREA/${id}`, Token)
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Registro Eliminado!',
              showConfirmButton: false,
              timer: 1500,

            })
            setSubArea(subarea.filter((item) => item.ID !== id));
          },)
          .catch(function (error) {
            if (error.request["status"] == 404) {
              Swal.fire({
                icon: 'error',
                title: "No espoble eliminar este registro porque contiene dependencias",
                showConfirmButton: false,
                timer: 3000
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: error.request["status"],
                showConfirmButton: false,
                timer: 1500
              })
            }
          });
      }
    })




  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filteredProyect.filter(
      (row) =>

        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DESCRIPCION.toLowerCase().includes(searchValue) ||
        row.NOMBRE_PROYECTO.toLowerCase().includes(searchValue) ||
        row.NOMBRE_SUBPROYECTO.toLowerCase().includes(searchValue)


    );
    setSubArea(newData);
    if (searchValue === "") {
      setSubArea(filteredProyect);
    }
  };

  return (
    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">SUBAREA</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/crearSubArea/0" className="btn btnCrea btn-success">
                <AiOutlinePlus />
                &nbsp; Registrar SubArea
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar SubArea"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>
            <DataTable
              columns={columns}

              data={subarea}
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
        </div>
      </div>
    </div>
  );
};

export default SubArea;
