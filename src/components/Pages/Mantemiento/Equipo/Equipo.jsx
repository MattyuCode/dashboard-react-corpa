import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { API_Services } from "../../../Config/APIService";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import axios from 'axios';
const Equipo = () => {
  const [equipo, setEquipo] = useState([]);
  const [filterEquipo, setFilteredEquipo] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");

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
      width: "150px",
    },
    {
      name: "DESCRIPCION",
      selector: (row) => row.DESCRIPCION,
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
      width: "150px",
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <td>
          <Link
            to={`/detailsEquipo/${noCia}/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
          &nbsp;
          <Link
            to={`/editarEquipo/${row.ID}`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              delete_EQUIPO(row.ID)
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
    const API_Equipo = async () => {
      try {
        const response = await fetch(`${API_Services}/EQUIPO/Select/${noCia}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setEquipo(data);
        setFilteredEquipo(data);
      } catch (error) {
        console.log(error);
      }
    };
    API_Equipo(token);
  }, [token, noCia]);

 

  const delete_EQUIPO = async (id) => {
   
    Swal.fire({
      title: 'Desea Eliminar el Registro?',
      text: "Esta Accion no se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      debugger
      if (result.isConfirmed) {
        axios.delete(`/api/EQUIPO/${id}`, {headers: { Authorization: `Bearer ${token}` }})
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Registro Eliminado!',
              showConfirmButton: false,
              timer: 1500,

            })
            setEquipo(equipo.filter((item) => item.ID !== id));
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
    const newData = filterEquipo.filter(
      (row) =>
        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DESCRIPCION.toLowerCase().includes(searchValue)||
        row.NOMBRE_PROYECTO.toLowerCase().includes(searchValue) ||
        row.NOMBRE_SUBPROYECTO.toLowerCase().includes(searchValue)
    );
    setEquipo(newData);
    if (searchValue === "") {
      setEquipo(filterEquipo);
    }
  };

  return (
    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Equipos</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/crearEquipo" className="btn btnCrea btn-success">
                <AiOutlinePlus />
                &nbsp; Registrar equipo
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar equipo..."
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>
            <DataTable
              columns={columns}
              data={equipo}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              fixedHeader
              customStyles={customStyles}
              noDataComponent={<CustomNoDataComponent />}
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipo;
