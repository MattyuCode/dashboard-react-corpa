import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import { API_Services } from "../../../../Config/APIService";


const DetailsEquipo = () => {
  const { noCia, token } = TokenANDnoCia();
  const { ID } = useParams();
  const [EquipoDetalles, setEquipoDetalles] = useState([]);

  useEffect(() => {
    const fetchEquipoDetails = async () => {
      try {
        const response = await fetch(
          `${API_Services}/EQUIPO/Select/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        
        setEquipoDetalles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEquipoDetails();
  }, [noCia, ID, token]);

  if (!EquipoDetalles) {
    return <p>Cargando detalles de la equipo...</p>;
  }

  return (
    <div className="container  mt-4">
      <div className="row rowALlDeta" style={{ padding: "0 9rem" }}>
        <div className="col-md-12">
          <span className="titless text-center">Detalles de Equipo</span>
        </div>

        {EquipoDetalles.map((quipo) => (
          <div key={quipo.ID}>
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
                          value={`${quipo.NO_CIA}`}
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
                          value={`${quipo.ID}`}
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
                          value={`${quipo.NOMBRE}`}
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
                          value={`${quipo.DESCRIPCION}`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/equipo"
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

export default DetailsEquipo;
