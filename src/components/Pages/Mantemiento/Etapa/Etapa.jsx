import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { API_Services } from "../../../../Config/APIService";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const Etapa = () => {
  const [etapa, setEtapa] = useState([]);
  const [filteredEtapa, setFilteredEtapa] = useState([]);
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
      selector: (row) => row.ID_SUBPROYECTO,
      sortable: true,
      width: "200px",
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <td>
          <Link
            to={`/detallesEtapa/${noCia}/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
          &nbsp;
          <Link
            to={`/editarEtapa/${row.ID}`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              Swal.fire({
                title: "¿Está seguro de eliminar la Etapa?",
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
                  deleteIdEtapa(row.ID);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire("Cancelado", "La Etapa está segura 🗃", "error");
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
    const API_Etapa = async () => {
      try {
        const response = await fetch(`${API_Services}/ETAPA/Select/${noCia}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setEtapa(data);
        setFilteredEtapa(data);
      } catch (error) {
        console.log(error);
      }
    };
    API_Etapa();
  }, [token, noCia]);

  const deleteIdEtapa = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `${API_Services}/ETAPA/${id}`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        setEtapa(etapa.filter((item) => item.ID !== id));
        Swal.fire({
          icon: "success",
          title: `${data.msg}`,
          text: "La etapa se ha eliminado exitosamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar la etapa.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filteredEtapa.filter(
      (row) =>
        row.NOMBRE.toLowerCase().includes(searchValue) ||
        row.DESCRIPCION.toLowerCase().includes(searchValue)
    );
    setEtapa(newData);
    if (searchValue === "") {
      setEtapa(filteredEtapa);
    }
  };

  return (
    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Consulta de Etapas</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/crearEtapa" className="btn btnCrea btn-success">
                <AiOutlinePlus />
                &nbsp; Registrar etapa
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar etapa"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>
            <DataTable
              columns={columns}
              data={etapa}
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

export default Etapa;
