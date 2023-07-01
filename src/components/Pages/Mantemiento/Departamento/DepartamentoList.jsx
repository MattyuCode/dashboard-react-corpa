import React, { useContext, useState, useEffect } from "react";

import { ToggleButton } from 'primereact/togglebutton';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DepartamentoContext } from "../../../../contexts/DepartamentoContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'react-datepicker/dist/react-datepicker.css'
import Form from 'react-bootstrap/Form';

//import Actividades from "./Actividad";

const DepartamentoList = () => {

    const { departamentos } = useContext(DepartamentoContext)
    const { UPDATE_PROYECTO } = useContext(DepartamentoContext)
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    //obtiene el texto del input de filtro 
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        NO_CIA: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        DESCRIPCION: { value: null, matchMode: FilterMatchMode.IN },
        ID: { value: null, matchMode: FilterMatchMode.IN },
        DESCRIPCION_AREA: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    });



//actiba los botones check segun el estado falso o verdadero
    const buttonColumnTemplate = (rowData) => {
        //ACTIVA LOS SELECT
        useEffect(() => {
            const activa = () => {
                if (rowData.IND_PROYECTOS === "true") {
                    document.getElementById("check" + rowData.ID).checked = true
                } else {
                    document.getElementById("check" + rowData.ID).checked = false
                }
            }
            activa()
        }, [])


        //DEVUELVE LOS BOTONES
        if (rowData.IND_PROYECTOS === "true") {
            return (
                <div className="row  col-md-12" >
                    <div className="col-md-4">
                        <Button type="button" id={"boton" + rowData.ID} onClick={() => handleCHECK(rowData.NO_CIA, rowData.FINCA, rowData.AREA, rowData.DEPA, rowData.ID)} icon="pi pi-check-square" severity="success" rounded></Button>

                    </div>

                </div>
            );
        } else {
            return (
                <div className="row  col-md-12" >
                    <div className="col-md-4">
                        <Button type="button" id={"boton" + rowData.ID} onClick={() => handleCHECK(rowData.NO_CIA, rowData.FINCA, rowData.AREA, rowData.DEPA, rowData.ID)} icon="pi pi-check-square" severity="warning" rounded></Button>

                    </div>

                </div>
            );
        }

    };

    const buttoncheckColumnTemplate = (rowData) => {

        const id = "check" + rowData.ID
        return (
            <div className="row  col-md-3 flex-column align-items-center" >
                <div class="custom-control custom-switch " >
                    <Form.Check
                        type="switch"
                        id={id}
                    />

                </div>

            </div>
        );
    };

    //se ejecuta al dar click al boton de aplicar cambios
    const handleCHECK = (NO_CIA, FINCA, AREA, DEPA, ID) => {
        var IND_FINCA = document.getElementById("check" + ID).checked
        UPDATE_PROYECTO(NO_CIA, FINCA, AREA, DEPA, IND_FINCA)
        document.getElementById("boton" + ID).style.backgroundColor = "#1FDADA"
    };



    return (<div>


        <div className="row  " >
            <div className="d-flex mb-3 justify-content-between">

                <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar Departamento" />
                    </span>
                </div>
            </div>
        </div>


        <div className="card">

            <ToggleButton checked={true} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Lista de Departamentos" />
            <DataTable value={departamentos}
                paginator
                rows={10}
                scrollable
                className="mt-4"

                selectionMode="checkbox"
                onSelectionChange={(e) => setselectedDepartamento(e.value)} dataKey="ID" tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 25, 50]}
                filters={filters} filterDisplay="menu" globalFilterFields={['ID', 'NO_CIA', 'DESCRIPCION_AREA', 'DESCRIPCION']}
                emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="ID" header="ID" style={{ minWidth: '10px' }} sortable frozen={true} className="font-bold"></Column>
                <Column field="DESCRIPCION_AREA" header="AREA" style={{ minWidth: '100px' }} sortable></Column>
                <Column field="DESCRIPCION" header="DEPARTAMENTO" style={{ minWidth: '200px' }} sortable></Column>
                <Column body={buttoncheckColumnTemplate} headerStyle={{ width: '3rem' }} disabled={rowData => !rowData.IND_PROYECTOS}></Column>
                <Column header="APLICAR CAMBIOS" style={{ minWidth: '200px' }} body={buttonColumnTemplate} sortable></Column>

            </DataTable>
           
        </div>
    </div>)


}

export default DepartamentoList;