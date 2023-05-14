import { useEffect, useState } from "react";
import { API_Services } from "../../../../Config/APIService";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Area.css";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";

const Area = () => {
  const [area, setArea] = useState([]);
  const [filterArea, setFilterArea] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");

  const columns = [
    {
      name: "NOMBRE AREA",
      selector: (row) => row.NOMBRE,
      sortable: true,
      width: "200px",
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.DESCRIPCION,
      sortable: true,
    },
    {
      name: "ID_SUBPROYECTO",
      selector: (row) => row.ID_SUBPROYECTO,
      sortable: true,
      width: "200px",
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <td>
          <Link
            to={`/detailsArea/${noCia}/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
          &nbsp;
          <Link
            to={`/editarArea/${row.ID}`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
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
                  deleteArea(row.ID);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire("Cancelado", "El registro está segura 🗃", "error");
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
    const isArea = async () => {
      try {
        const response = await fetch(`${API_Services}/AREA/Select/${noCia}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setArea(data);
        setFilterArea(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    isArea();
  }, [noCia, token]);

  const deleteArea = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `${API_Services}/AREA/${id}`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        setArea(area.filter((item) => item.ID !== id));
        Swal.fire({
          icon: "success",
          title: `${data.msg}`,
          text: "Se ha eliminado el Area exitosamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar el area.",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filterArea.filter(
      (item) =>
        item.NOMBRE.toLowerCase().includes(searchValue) ||
        item.DESCRIPCION.toLowerCase().includes(searchValue)
    );
    setArea(newData);
    if (searchValue === "") {
      setArea(filterArea);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Consulta de Area</span>
        </div>
        <div className="col-md-12">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/createArea" className="btn btnCrea btn-success">
                <AiOutlinePlus /> Registrar Area
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar Area"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>

            <DataTable
              columns={columns}
              data={area}
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

export default Area;
