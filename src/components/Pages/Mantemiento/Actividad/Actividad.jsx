import { useEffect, useState } from "react";
import "./Actividad.css";
import { BiDetail, BiLoader } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { FormControl } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Actividades = () => {
  const [actVidd, setActiVidad] = useState([]);
  const [filteredActVidd, setFilteredActVidad] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(actVidd);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  });

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
      // width: "300px",
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
            to={`/detailsActividad/${noCia}/${row.ID}`}
            className="btn btn-warning btn-sm"
          >
            <BiDetail /> Detalles
          </Link>{" "}
          &nbsp;
          <Link
            to={`/editarActividad/${row.ID}`}
            className="btn btn-sm btn-primary"
          >
            <AiFillEdit /> Editar
          </Link>{" "}
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
                  deleteIDActividad(row.ID);
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
    const API_Actividad = async (accessToken) => {
      try {
        const url = `https://apiproyectosdesarrollo.corpacam.com.gt/api/ACTIVIDAD/Select/${noCia}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        setActiVidad(data);
        // console.log(data);
        setFilteredActVidad(data);
        // setTotalRows(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    API_Actividad(token);
  }, [token, noCia]);

  // API PARA ELIMINAR UN ID DE LA ACTIVIDA
  const deleteIDActividad = async (id) => {
    try {
      const urlDele = `https://apiproyectosdesarrollo.corpacam.com.gt/api/ACTIVIDAD/${id}`;
      // const urlDele = `${process.env.REACT_APP_BACKEND_URL}/api/ACTIVIDAD/${id}`;

      const requestOptions = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(urlDele, requestOptions);
      const data = await response.json();
      // console.log(data.msg)
      if (response.ok) {
        setActiVidad(actVidd.filter((item) => item.ID !== id));
        Swal.fire({
          icon: "success",
          // title: "Actividad Eliminada",
          title: `${data.msg}`,
          text: "La actividad se ha eliminado exitosamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar la actividad.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filteredActVidd.filter(
      (row) =>
        row.DESCRIPCION.toLowerCase().includes(searchValue)
    );
    setActiVidad(newData);
    if (searchValue === "") {
      setActiVidad(filteredActVidd);
    }
  };

  return (
    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Consulta de Actividades</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/crearActividad" className="btn btnCrea btn-success">
                <AiOutlinePlus />
                &nbsp; Registrar actividad
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar actividad"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>
            
            <DataTable
              columns={columns}
              data={rows}
              // data={actVidd}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              fixedHeader
              customStyles={customStyles}
              noDataComponent={<CustomNoDataComponent />}
              highlightOnHover
                progressPending={pending}
              progressComponent={<BiLoader />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividades;
