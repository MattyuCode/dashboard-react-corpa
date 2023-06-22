import { Link, useParams } from "react-router-dom";
import { API_Services } from "../../../../Config/APIService";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TokenANDnoCia } from "../../../../Utilities/TokenANDnoCia";


const DetallesAdvertencia = () => {
  const { noCia, token } = TokenANDnoCia();
  const { ID } = useParams();
  const [detallesAdvertencia, setDetallesAdvertencia] = useState([]);

  useEffect(() => {
    const fetchAdvertenciaDetails = async () => {
      try {
        const response = await fetch(
          `${API_Services}/LUGARADVERTENCIA/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setDetallesAdvertencia(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdvertenciaDetails();
  }, [ID, noCia, token]);

  if (!detallesAdvertencia) {
    return <p>Cargando detalles de area...</p>;
  }
 
  

  return (
    <div className="container mt-4">
      <div className="row rowALlDeta" style={{ padding: "0 9rem" }}>
        <div className="col-md-12">
          <span className="titless text-center">Detalles de Advertencia</span>
        </div>
        {detallesAdvertencia.map((item) => (
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
                          value={`${item.NO_CIA}`}
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
                          value={`${item.ID}`}
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
                          value={`${item.NOMBRE}`}
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
                          value={`${item.DESCRIPCION}`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/lugarAdvertencia"
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

export default DetallesAdvertencia;
