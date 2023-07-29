import React, { useContext, useState, useEffect } from "react";

import { ToggleButton } from 'primereact/togglebutton';


import Swal from "sweetalert2";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ParteContext } from "../../../../contexts/ParteContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { ResponsableContext } from "../../../../contexts/ResponsableContext";

//import 'primereact/resources/themes/saga-blue/theme.css'; se usa para cambiar el tema de la tabla
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";





//import Actividades from "./Actividad";

const ResponsableList = () => {


   

    const { empleados, 
            usuarios,
            CREATE_RESPONSABLE,
           responsables,
           deleteResponsable} = ResponsableContext();

          
    
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    

    //obtiene el texto del input de filtro 
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


;

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        NO_EMPLE: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        NOMBRE: { value: null, matchMode: FilterMatchMode.IN },
        USUARIO: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
       
    });


    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleRowSelect = (event) => {
        setSelectedRowId(event.data.id); // Suponiendo que la fila tiene una propiedad llamada "id"
    };


    const buttonColumnTemplate = (rowData) => {
        return (
            <div className="row  col-md-12" >
               
                <div className="col-md-4 ">

                    <Button type="button" onClick={() => handleliminar(rowData.NO_EMPLE)} icon="pi pi-trash" severity="danger" rounded></Button>
                </div>

            </div>

        );
    };

  

    const handleliminar = (NOEMPLE) => {
        deleteResponsable(NOEMPLE)
       
    };

    {/*agregando una nueva fila de manera Dinamica */}

    
  
    return (<div>

<br /><br /><br /><br />
<div className="row  " >
            <div className="d-flex mb-3 justify-content-between">
               

                <div className="flex flex-wrap gap-2 justify-content-between align-items-center">

                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar Responsable" />
                    </span>
                </div>

            </div>

        </div>


        <div className="card">




            <ToggleButton checked={true} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Lista de Responsables" offLabel="Lista de Responsables" />
            <DataTable value={responsables} paginator rows={10} scrollable /*scrollHeight="400" */ className="mt-4"

                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id" selectionMode="checkbox"
                filters={filters} filterDisplay="menu" globalFilterFields={['NO_EMPLE', 'NOMBRE', 'USUARIO']}
                emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                <Column field="NO_EMPLE" header="NO_EMPLE" style={{ minWidth: '10px' }} sortable frozen={true} className="font-bold"></Column>
                <Column field="NOMBRE" header="NOMBRE" style={{ minWidth: '100px' }} sortable></Column>
                <Column field="USUARIO" header="USUARIO" style={{ minWidth: '200px' }} sortable></Column>
                <Column header="Acciones" body={buttonColumnTemplate} style={{ minWidth: '300px' }} alignFrozen="right" frozen />

            </DataTable>
        </div>
    </div>)
}

export default ResponsableList;
