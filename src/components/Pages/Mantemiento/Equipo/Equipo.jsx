import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { API_Services } from "../../../../Config/APIService";
import "./Equipo.css";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const Equipo = () => {
  const [equipo, setEquipo] = useState([]);
  const [filterEquipo, setFilteredEquipo] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");

  const columns = [
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
    },
    {
      name: "ID_SUBPROYECTO",
      selector: (row) => row.ID_SUBAREA,
      sortable: true,
      width: "200px",
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
              Swal.fire({
                title: "¿Está seguro de eliminar el equipo?",
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
                  deleteIdEquipo(row.ID);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire("Cancelado", "El equipo está segura 🗃", "error");
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

  const deleteIdEquipo = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `${API_Services}/EQUIPO/${id}`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        setEquipo(equipo.filter((item) => item.ID !== id));
        Swal.fire({
          icon: "success",
          title: `${data.msg}`,
          text: "El equipo se ha eliminado exitosamente",
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
    const newData = filterEquipo.filter(
      (row) =>
        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DESCRIPCION.toLowerCase().includes(searchValue)
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
          <span className="titless text-center">Consulta de Equipos</span>
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
