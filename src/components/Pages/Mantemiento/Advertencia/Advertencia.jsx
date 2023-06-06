import { useEffect, useState } from "react";
import { API_Services } from "../../../Config/APIService";
import { TokenANDnoCia } from "../../../Utilities/TokenANDnoCia";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import axios from 'axios';
const Advertencia = () => {
  const { noCia, token } = TokenANDnoCia();
  const [advertencia, setAdvertencia] = useState([]);
  const [filterAdvertencia, setFilterAdvertencia] = useState([]);
 

  const columns = [
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
      width: "80px",
    },
    {
      name: "NOMBRE AREA",
      selector: (row) => row.NOMBRE,
      sortable: true,
      width: "150px",
    },
    {
      name: "DESCRIPCIÓN",
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
      name: "SUB_PROYECTO",
      selector: (row) => row.NOMBRE_SUBPROYECTO,
      sortable: true,
      width: "150px",
    },
    {
      name: "ACCIONES",
      width: "300px",
      cell: (row) => (
        <td>
          <Link
            to={`/detallesAdvertencia/${noCia}/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
          &nbsp;
          <Link
            to={`/editarAdvertencia/${row.ID}`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              delete_LUGARADVERTENCIA(row.ID)
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
    const api_advertencia = async () => {
      try {
        const response = await fetch(
          `${API_Services}/LUGARADVERTENCIA/Select/${noCia}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setAdvertencia(data);
        setFilterAdvertencia(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    api_advertencia();
  }, [noCia, token]);


  const delete_LUGARADVERTENCIA = async (id) => {
   
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
          axios.delete(`/api/LUGARADVERTENCIA/${id}`, {headers: { Authorization: `Bearer ${token}` }})
          .then(function (response) {
              Swal.fire({
                  icon: 'success',
                  title: 'Registro Eliminado!',
                  showConfirmButton: false,
                  timer: 1500,
                  
              })
              setAdvertencia(advertencia.filter((item) => item.ID !== id));
          },)
          .catch(function (error) {
            if(error.request["status"]==404){
              Swal.fire({
                icon: 'error',
               title: "No espoble eliminar este registro porque contiene dependencias",
               showConfirmButton: false,
               timer: 3000
           })
            }else{
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
    const newData = filterAdvertencia.filter(
      (row) =>
        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DESCRIPCION.toLowerCase().includes(searchValue)||
        row.NOMBRE_PROYECTO.toLowerCase().includes(searchValue) ||
        row.NOMBRE_SUBPROYECTO.toLowerCase().includes(searchValue)
    );
    setAdvertencia(newData);
    if (searchValue === "") {
      setAdvertencia(filterAdvertencia);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Advertencia</span>
        </div>
        <div className="col-md-12">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/createAdvertencia" className="btn btnCrea btn-success">
                <AiOutlinePlus /> Registrar Advertencia
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar Advertencia"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>

            <DataTable
              columns={columns}
              data={advertencia}
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

export default Advertencia;
