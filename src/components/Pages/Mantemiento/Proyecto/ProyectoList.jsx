import React, { useContext, useState, useEffect } from "react";

import { ToggleButton } from 'primereact/togglebutton';


import Swal from "sweetalert2";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProyectoContext } from "../../../../contexts/ProyectoContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';


//import 'primereact/resources/themes/saga-blue/theme.css'; se usa para cambiar el tema de la tabla
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TreeTable } from 'primereact/treetable';
import { FormControl } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

import { Toast } from 'primereact/toast';

//import Actividades from "./Actividad";

const ProyectoList = () => {


    const usenavigate = useNavigate();

    const { proyectos } = useContext(ProyectoContext)
    const { API_SUBPROYECTO } = useContext(ProyectoContext)
    const { subproyectos } = useContext(ProyectoContext)
    const { deleteProyectos } = useContext(ProyectoContext)

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [expandedRows, setExpandedRows] = useState([]);

    //obtiene el texto del input de filtro 
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };



    const balanceTemplate = (rowData) => {
        return <span className="font-bold">{formatCurrency(rowData.balance)}</span>;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('es', { style: 'currency', currency: 'ES' });
    };

    //se establecen las columpas permitidadas para el filtro
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        DESCRIPCION: { value: null, matchMode: FilterMatchMode.IN },   
    });


   //se ejecuta al dar click en el icono > para abrir la fila
    const onRowExpand = (event) => {
        API_SUBPROYECTO(event.data.ID)
        setExpandedRows({ [event.data.ID]: false });
       
    };


    //se ejecuta al dar click en el icono > para cerrar la fila seleccionada
    const onRowCollapse = (event) => {
        setExpandedRows(null);
       
    };

  

// RETORNA LOS EVENTOS DE LOS BOTONES
    const buttonColumnTemplate = (rowData) => {
        return (
            <div className="row  col-md-12" >
                <div className="col-md-4">
                    <Button type="button" onClick={() => handledetalle(rowData.ID)} icon="pi pi-th-large" severity="warning" rounded></Button>

                </div>
                <div className="col-md-3 ">
                    <Button type="button" onClick={() => handleditar(rowData.ID)} icon="pi pi-pencil" severity="primary" rounded></Button>

                </div>
                <div className="col-md-4 ">

                    <Button type="button" onClick={() => handleliminar(rowData.ID)} icon="pi pi-trash" severity="danger" rounded></Button>
                </div>

            </div>

        );
    };

    //REDICCIONAN A LAS VISTAS SEGUN LA OPCION SLECCIONADA
    const handledetalle = (rowId) => {

        return usenavigate(`/DetailsProyect/${rowId}`)

    };
    const handleditar = (rowId) => {

        return usenavigate(`/crearProyecto/${rowId}`)

    };

    const handleliminar = (rowId) => {
        deleteProyectos(rowId)

    };

    const ListSubProyectos=()=>{
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SUBPROYECTO</th>
                            <th>DESCRIPCION</th>
                            <th>FECHAINICIO</th>
                            <th>FECHAFIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subproyectos.map((items) => (
                            <tr>
                                <td>{items.ID}</td>
                                <td>{items.NOMBRE}</td>
                                <td>{items.DESCRIPCION}</td>
                                <td>{formatDate(items.FECHA_INICIO)}</td>
                                <td>{formatDate(items.FECHA_FIN)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );

    }

    return (<div>

        <div className="row  " >
            <div className="d-flex mb-3 justify-content-between">
                <Link to="/crearProyecto/0" className="btn btnCrea btn-success">
                    <AiOutlinePlus />
                    &nbsp; Registrar Proyecto
                </Link>

                <div className="flex flex-wrap gap-2 justify-content-between align-items-center">

                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar Proyecto" />
                    </span>
                </div>

            </div>
        </div>


        <div className="card">

            <ToggleButton checked={true} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Lista de Proyectos" />
            <DataTable value={proyectos} paginator rows={10} scrollable
                expandedRows={expandedRows}
                onRowExpand={onRowExpand}
                onRowCollapse={onRowCollapse}
                dataKey="ID" // Reemplaza 'id' con la propiedad única de cada fila en tus datos
                rowExpansionTemplate={ListSubProyectos}


            /*scrollHeight="400" */ className="mt-4"

                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 25, 50]} selectionMode="checkbox"
                filters={filters} filterDisplay="menu" globalFilterFields={['ID', 'NOMBRE', 'DESCRIPCION']}
                emptyMessage="No customers found." currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} filas">
                <Column expander style={{ minWidth: '10px' }} sortable frozen={true} className="font-bold"></Column>
                <Column field="ID" header="ID" style={{ minWidth: '10px' }} sortable frozen={true} className="font-bold"></Column>
                <Column field="NOMBRE" header="PROYECTO" style={{ minWidth: '100px' }} sortable></Column>
                <Column field="DESCRIPCION" header="DESCRIPCION" style={{ minWidth: '200px' }} sortable></Column>
                <Column header="Acciones" body={buttonColumnTemplate} style={{ minWidth: '300px' }} alignFrozen="right" frozen />

            </DataTable>

        </div>
    </div>)
}

export default ProyectoList;

const formatDate = (date) => {

    const fecha = date.split(" ");// string con la fecha en formato YYYY-MM-DD
    const parts = fecha[0].split("/");

    const fechaObjeto = parts[0] + "/" + parts[1] + "/" + parts[2];
    return fechaObjeto;
}