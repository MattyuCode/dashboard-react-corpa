import React, { useContext, useState, useEffect } from "react";

import { ToggleButton } from 'primereact/togglebutton';


import Swal from "sweetalert2";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { EquipoContext } from "../../../../contexts/EquipoContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';


//import 'primereact/resources/themes/saga-blue/theme.css'; se usa para cambiar el tema de la tabla
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";





//import Actividades from "./Actividad";

const EquipoList = () => {


    const usenavigate = useNavigate();

    const { equipos } = useContext(EquipoContext)

    const { deleteEquipos } = useContext(EquipoContext)
    
    const [globalFilterValue, setGlobalFilterValue] = useState('');



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

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        DESCRIPCION: { value: null, matchMode: FilterMatchMode.IN },
        NOMBRE_PROYECTO: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        NOMBRE_SUBPROYECTO: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        //  status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });


    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleRowSelect = (event) => {
        setSelectedRowId(event.data.id); // Suponiendo que la fila tiene una propiedad llamada "id"
    };


    const buttonColumnTemplate = (rowData) => {
        return (
            <div className="row  col-md-12" >
                <div className="col-md-4">
                    <Button type="button" onClick={() => handledetalle(rowData.NO_CIA, rowData.ID)} icon="pi pi-th-large" severity="warning" rounded></Button>

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

    const handledetalle = (rowNocia, rowId) => {

        return usenavigate(`/detailsEquipo/${rowNocia}/${rowId}`)

    };
    const handleditar = (rowId) => {

        return usenavigate(`/editarEquipo/${rowId}`)

    };

    const handleliminar = (rowId) => {
        deleteEquipos(rowId)


    };

    return (<div>


        <div className="row  " >
            <div className="d-flex mb-3 justify-content-between">
                <Link to="/crearEquipo" className="btn btnCrea btn-success">
                    <AiOutlinePlus />
                    &nbsp; Registrar Equipo
                </Link>

                <div className="flex flex-wrap gap-2 justify-content-between align-items-center">

                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar Equipo" />
                    </span>
                </div>

            </div>

        </div>

        <div className="card">




            <ToggleButton checked={true} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Lista de Equipos" offLabel="Lista de Equipos" />
            <DataTable value={equipos} paginator rows={10} scrollable /*scrollHeight="400" */ className="mt-4"

                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id" selectionMode="checkbox"
                filters={filters} filterDisplay="menu" globalFilterFields={['ID', 'NOMBRE', 'DESCRIPCION', 'NOMBRE_PROYECTO', 'NOMBRE_SUBPROYECTO']}
                emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                <Column field="ID" header="ID" style={{ minWidth: '10px' }} sortable frozen={true} className="font-bold"></Column>
                <Column field="NOMBRE" header="EQUIPO" style={{ minWidth: '100px' }} sortable></Column>
                <Column field="DESCRIPCION" header="DESCRIPCION" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_PROYECTO" header="PROYECTO" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_SUBPROYECTO" header="SUBPROYECTO" style={{ minWidth: '200px' }} sortable></Column>
                <Column header="Acciones" body={buttonColumnTemplate} style={{ minWidth: '300px' }} alignFrozen="right" frozen />



            </DataTable>
        </div>
    </div>)
}

export default EquipoList;