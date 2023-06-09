import { useEffect, useState } from "react";
//import "./Actividad.css";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { FormControl } from "react-bootstrap";
import axios from 'axios';
import Table from 'react-bootstrap/Table';

// import 'bootstrap/dist/css/bootstrap.min.css';

const Proyecto = () => {
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
        `${axios.getUri()}/api/SUBPROYECTO/Select/${localStorage.getItem("NO_CIA")}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      
      setSubProyecto(data);
      setUsuarioCrea(data[0]["USUARIO_CREA"]);
      setEstado(data[0]["ESTADO"]);
      
    } catch (error) {
      console.log(error);
    }
  };
  API_SUBPROYECTO(token);

  
     
     
  
  


  
  function ExpandedComponent(idproyecto) {
    debugger;
    var cont=1;
    return (
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>NOMBRE</th>
          <th>DESCRIPCION</th>
          <th>FECHAINICIO</th>
          <th>FECHAFIN</th>
        </tr>
      </thead>
      <tbody>
      {Listsubproyect.map((items) => (
                          
                     
        <tr>
          <td>{cont++}</td>
          <td>{items.NOMBRE}</td>
          <td>{items.DESCRIPCION}</td>
          <td>{items.FECHA_INICIO}</td>
          <td>{items.FECHA_FIN}</td>
        </tr>
          ))}
      </tbody>
    </Table>
  );
    
  }

  const columns = [
   
    {
      name: "DESCRIPCION",
      selector: (row) => row.DESCRIPCION,
      
      sortable: true,
      // width: "300px",
    },
    
    {
      name: "SUBPROYECTO",
      //selector: (row) => row.ID,
      
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
            to={`/crearProyecto/${row.ID}`}
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
        const url = `https://apiproyectosdesarrollo.corpacam.com.gt/api/PROYECTO/Select/${noCia}`;
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
          axios.delete(`/api/PROYECTO/${id}`,Token)
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
    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Proyectos</span>
        </div>

        <div className="col-md-12 ">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-between">
              <Link to="/crearProyecto/0" className="btn btnCrea btn-success">
                <AiOutlinePlus />
                &nbsp; Registrar Proyecto
              </Link>

              <FormControl
                type="search"
                placeholder="Buscar Proyecto"
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
              expandableRows
              expandableRowsComponent={ExpandedComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
