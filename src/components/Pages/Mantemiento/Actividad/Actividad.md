import { useEffect, useState } from "react";
import "./Actividad.css";
// import { AiOutlinePlus } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Actividades = () => {
  const [actVidd, setActiVidad] = useState([]);
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");

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

  return (
    <div className="container">
      <div className="">
        <h3 className="card-header text-center mb-4">Actividad</h3>
        <Link to="/crearActividad" className="btn btn-success mb-4">
          {/* <AiOutlinePlus/>  */}
          <i className="fas fa-plus"></i>
          &nbsp; Agregar nuevo
        </Link>

        <table id="myTable" className="display table">
          <thead>
            <tr>
              {/* <th scope="col">NO_CIA</th> */}
              <th scope="col">Nombres</th>
              <th scope="col">Descripción</th>
              <th scope="col">ID_SUBPROYECTO</th>
            </tr>
          </thead>
          <tbody>
            {actVidd.map((items) => (
              <>
                <tr>
                  {/* <th scope="row">{items.NO_CIA}</th> */}
                  <td>{items.NOMBRE}</td>
                  <td>{items.DESCRIPCION}</td>
                  <td>{items.ID_SUBPROYECTO}</td>
                  <td>
                    <Link
                      to={`/detailsActividad/${noCia}/${items.ID}`}
                      className="btn btn-warning btn-sm"
                    >
                      <BiDetail /> Detalles
                    </Link>{" "}
                    &nbsp;
                    <Link
                      to={`/editarActividad/${items.ID}`}
                      className="btn btn-sm btn-primary"
                    >
                      <AiFillEdit /> Editar
                    </Link>{" "}
                    &nbsp;
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        Swal.fire({
                          title: "¿Esta seguro de eliminar la actividad?",
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
                            deleteIDActividad(items.ID);
                          } else if (
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
                            Swal.fire(
                              "Cancelado",
                              "La actividad esta seguro 🗃",
                              "error"
                            );
                          }
                        });
                      }}
                    >
                      <AiTwotoneDelete /> Eliminar
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Actividades;
