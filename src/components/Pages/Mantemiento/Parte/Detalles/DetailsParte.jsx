import { Link, useParams } from "react-router-dom";
import { API_Services } from "../../../../../Config/APIService";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const DetailsParte = () => {
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");
  const { ID } = useParams();
  const [parteDetalles, setParteDetalles] = useState([]);

  useEffect(() => {
    const fetchParteDetails = async () => {
      try {
        const response = await fetch(
          `${API_Services}/PARTE/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        console.log(data)
        setParteDetalles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParteDetails();
  }, [ID, noCia, token]);

  if (!parteDetalles) {
    return <p>Cargando detalles de parte...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row rowALlDeta" style={{ padding: "0 9rem" }}>
        <div className="col-md-12">
          <span className="titless text-center">Detalles de Parte</span>
        </div>
        {parteDetalles.map((item) => (
          <div key={item.ID}>
            <div className="col-md-12 ">
              <div className="tab-contentAct shadow">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">NO CIA</label>
                        <input
                          type="text"
                          id="nombreINP"
                          className="form-control"
                          name="nombre"
                          readOnly
                          value={`${noCia}`}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">ID</label>
                        <input
                          type="text"
                          id="nombreINP"
                          className="form-control"
                          name="nombre"
                          readOnly
                          value={`${item.ID_EQUIPO}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-5">
                      <div className="form-outline">
                        <label className="form-label">NOMBRE</label>
                        <input
                          type="text"
                          id="inputDes"
                          className="form-control"
                          value={`${item.NOMBRE_PARTE}`}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-5">
                      <div className="form-outline">
                        <label className="form-label">DESCRIPCION</label>
                        <textarea
                          type="text"
                          id="inputDes"
                          className="form-control"
                          value={`${item.DESCRIPCION_PARTE}`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/parte"
                      type="submit"
                      className="btnActivity btn w-50 btn-outline-danger btn-block"
                    >
                      <IoArrowBackOutline /> Regresar
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsParte;
