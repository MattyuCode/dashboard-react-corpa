import { useEffect, useState } from "react";
 
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";
import { API_Services } from "../../../../Config/APIService";


const DetailsEtapa = () => {
  const { noCia, token } = TokenANDnoCia();
  const { ID } = useParams();
  const [detallesEtapa, setDetallesEtapa] = useState([]);


  useEffect(() => {
    const fetchEtapa = async () => {
      try {
        const response = await fetch(
          `${API_Services}/ETAPA/Select/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setDetallesEtapa(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEtapa();
  }, [noCia, ID, token]);

  if (!detallesEtapa) {
    return <p>Cargando detalles de la Etapa...</p>;
  }

  return (
    <div className="container  mt-4">
      <div className="row rowALlDeta" style={{ padding: "0 9rem" }}>
        <div className="col-md-12">
          <span className="titless text-center">Detalles de Etapa</span>
        </div>

        {detallesEtapa.map((etapas) => (
          <div key={etapas.ID}>
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
                          value={`${etapas.NO_CIA}`}
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
                          value={`${etapas.ID}`}
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
                          value={`${etapas.NOMBRE}`}
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
                          value={`${etapas.DESCRIPCION}`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/etapa"
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




}

export default DetailsEtapa