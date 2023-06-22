import { useState, useEffect } from "react";
import { API_Services } from "../../../Config/APIService";
import { TokenANDnoCia } from "../../../Utilities/TokenANDnoCia";
import { Table, Pagination } from "rsuite";
import "rsuite/dist/rsuite.css";
import { FormControl } from "react-bootstrap";

const Bitacora = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { noCia, token } = TokenANDnoCia();
  const [datosBitacora, setDatosBitacora] = useState([]);
  const [filterBitacora, setFilterBitacora] = useState([]);

  const getData = () => {
    if (sortColumn && sortType) {
      return datosBitacora.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return datosBitacora;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const getDatosBitacora = getData().filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i <= end;
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = filterBitacora.filter((item) => {
      if (
        item.FECHA_HORA.toLowerCase().includes(searchValue) ||
        item.PROYECTO.toLowerCase().includes(searchValue) ||
        item.SUBPROYECTO.toLowerCase().includes(searchValue) ||
        item.TAREA.toLowerCase().includes(searchValue) ||
        item.USUARIO.toLowerCase().includes(searchValue)
      ) {
        return true;
      }

      if (item.DESCRIPCION_AVANCE) {
        return item.DESCRIPCION_AVANCE.toLowerCase().includes(searchValue);
      }
      return false;
      //   item.AVANCE.toLowerCase().includes(searchValue);
    });
    setDatosBitacora(newData);
    if (searchValue === "") {
      setDatosBitacora(filterBitacora);
    }
  };

  useEffect(() => {
    const Api_Bitacora = async () => {
      try {
        const response = await fetch(
          `${API_Services}/AVANCE/GetBitacoraAvances/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        console.log(data);
        setDatosBitacora(data);
        setFilterBitacora(data);
      } catch (error) {
        console.log(error);
      }
    };

    Api_Bitacora();
  }, [noCia, token]);

  const formatFechaModal = (fecha) => {
    const [date, time] = fecha.split("T");
    const [año, mes, dia] = date.split("-");
    const formato = [dia, mes, año].join("/");
    const formataedo = `${formato}  ${time}`;
    return formataedo;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Lista de Bitacoras</span>
        </div>
        <div className="col-md-12 mb-5">
          <div className="tab-contentAct card shadow">
            <div className="d-flex mb-3 justify-content-end">
              <FormControl
                type="search"
                placeholder="Buscar"
                className="inpuBuscar"
                style={{ width: "20%" }}
                onChange={handleFilter}
              />
            </div>
            <Table
              appearance={"primary"}
              height={400}
              data={getDatosBitacora}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={loading}
              bordered
              renderEmpty={() => {
                return (
                  <div className="rs-table-body-info">
                    No hay registros para mostrar{" "}
                  </div>
                );
              }}
              autoHeight
              affixHeader
              affixHorizontalScrollbar
            >
              <Column width={190} fixed sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  FECHA Y HORA
                </HeaderCell>
                <Cell>{(row) => formatFechaModal(row.FECHA_HORA)}</Cell>
              </Column>

              <Column width={190} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  PROYECTO
                </HeaderCell>
                <Cell>{(row) => row.PROYECTO}</Cell>
              </Column>

              <Column width={170} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  SUBPROYECTO
                </HeaderCell>
                <Cell>{(row) => row.SUBPROYECTO}</Cell>
              </Column>

              <Column width={175} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  TAREA
                </HeaderCell>
                <Cell>{(row) => row.TAREA}</Cell>
              </Column>

              <Column width={190} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  DESCRIPCIÓN DE AVANCE
                </HeaderCell>
                <Cell>{(row) => row.DESCRIPCION_AVANCE}</Cell>
              </Column>

              <Column width={90} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  AVANCE
                </HeaderCell>
                <Cell>{(row) => row.AVANCE}</Cell>
              </Column>

              <Column width={200} sortable resizable>
                <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
                  USUARIO
                </HeaderCell>
                <Cell>{(row) => row.USUARIO}</Cell>
              </Column>
            </Table>
            <div style={{ padding: 20 }}>
              <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                layout={["total", "-", "limit", "|", "pager", "skip"]}
                total={datosBitacora.length}
                limitOptions={[5, 10, 15, 50]}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bitacora;
