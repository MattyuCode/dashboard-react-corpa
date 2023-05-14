import { Link, useParams } from "react-router-dom";
import { API_Services } from "../../../../../Config/APIService";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const DetailsArea = () => {
  const token = localStorage.getItem("accessToken");
  const noCia = localStorage.getItem("NO_CIA");
  const { ID } = useParams();
  const [areaDetalles, setAreaDetalles] = useState([]);

  useEffect(() => {
    const fetchAreaDetails = async () => {
      try {
        const response = await fetch(
          `${API_Services}/AREA/SelectId/${noCia}/${ID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setAreaDetalles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAreaDetails();
  }, [ID, noCia, token]);

  if (!areaDetalles) {
    return <p>Cargando detalles de  area...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row rowALlDeta" style={{ padding: "0 9rem" }}>
        <div className="col-md-12">
          <span className="titless text-center">Detalles de Area</span>
        </div>
        {areaDetalles.map((area) => (
          <div key={area.ID}>
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
                          value={`${area.NO_CIA}`}
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
                          value={`${area.ID}`}
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
                          value={`${area.NOMBRE}`}
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
                          value={`${area.DESCRIPCION}`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/area"
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

export default DetailsArea;
