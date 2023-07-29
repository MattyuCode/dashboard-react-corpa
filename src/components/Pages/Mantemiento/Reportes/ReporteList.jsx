import React, { useContext, useState, useEffect, useRef } from "react";

import { ToggleButton } from 'primereact/togglebutton';


import Swal from "sweetalert2";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { ReporteContext } from "../../../../contexts/ReporteContext";




//import Actividades from "./Actividad";

const ReporteList = () => {

    const { reporte } = ReporteContext();
    const [globalFilterValue, setGlobalFilterValue] = useState('');




    //obtiene el texto del input de filtro 
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    //CONFIGURACION PARA EL FILTRADO DE LAS COLUMNAS

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        NO_CIA: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        NOMBRE_TAREA: { value: null, matchMode: FilterMatchMode.IN },
        ID_TAREAPADRE: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        TAREA_PADRE: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        DIRECTRICES: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    });



    //Genera el PDF DE LA TABLA
    const dataTableRef = useRef(null);
    
 


    //GENERA LA EXPORTACION DEL EXCEL DE LA TABLA
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(reporte);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'reporte');
        });
    };


    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };



    //ENCABEZAD PARA EL INPUT DE BUSQUEDA Y LOS  BOTONES PARA GENERAR EXCEL Y PDF
    const header = () => {
        return (
            <div className="row  " >
                <div className="col-md-10">

                    <div className="d-flex mb-3 justify-content-between">


                        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">

                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />

                            </span>

                        </div>
                    </div>
                   
                </div>
                <div className="col-md-2">
                        <Button style={{ marginRight: "20px" }} type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                      
                    </div>
                   

            </div>
        );
    }

    return (<div>

        <div className="card">





            <DataTable ref={dataTableRef} value={reporte} paginator rows={10} scrollable /*scrollHeight="400" */ className="mt-4"

                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 25, 50]} 
                dataKey="id" selectionMode="checkbox"
                filters={filters} filterDisplay="menu"
                header={header} globalFilterFields={['NO_CIA', 'NOMBRE_TAREA', 
                                                    'TAREA_PADRE', 'DIRECTRICES','DESCRIPCION_ADVERTENCIA',
                                                    'FECHA_INICIO','FECHA_FIN','FECHA_INICIOPROYECTADA',
                                                    'FECHA_FINPROYECTADA','PUNTUACION','AVANCE',
                                                    'PROYECTO','SUBPROYECTO',
                                                    'NOMBRE_ETAPA','NOMBRE_AREA','NOMBRE_SUBAREA',
                                                    'NOMBRE_EQUIPO','NOMBRE_ACTIVIDAD','NO_CIA_RESPONSABLE',
                                                    'NO_EMPLE_RESPONSABLE','NOMBRE',
                                                    'DEPTO_RESPONSABLE']}
                emptyMessage="No se Encontraron Registros." 
                currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords} Registros">

                <Column field="NO_CIA" header="NO_CIA" style={{ minWidth: '10px' }} sortable frozen={true} className="font-bold"></Column>
                <Column field="NOMBRE_TAREA" header="NOMBRE_TAREA" style={{ minWidth: '100px' }} sortable></Column>
                <Column field="TAREA_PADRE" header="TAREA_PADRE" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="DIRECTRICES" header="DIRECTRICES" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="DESCRIPCION_ADVERTENCIA" header="DESCRIPCION_ADVERTENCIA" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="FECHA_INICIO" header="FECHA_INICIO" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="FECHA_FIN" header="FECHA_FIN" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="FECHA_INICIOPROYECTADA" header="FECHA_INICIOPROYECTADA" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="FECHA_FINPROYECTADA" header="FECHA_FINPROYECTADA" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="PUNTUACION" header="PUNTUACION" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="AVANCE" header="AVANCE" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="PROYECTO" header="PROYECTO" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="SUBPROYECTO" header="SUBPROYECTO" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_ETAPA" header="NOMBRE_ETAPA" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_AREA" header="NOMBRE_AREA" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_SUBAREA" header="NOMBRE_SUBAREA" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_EQUIPO" header="NOMBRE_EQUIPO" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE_ACTIVIDAD" header="NOMBRE_ACTIVIDAD" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NO_CIA_RESPONSABLE" header="NO_CIA_RESPONSABLE" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NO_EMPLE_RESPONSABLE" header="NO_EMPLE_RESPONSABLE" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="NOMBRE" header="NOMBRE" style={{ minWidth: '200px' }} sortable></Column>
                <Column field="DEPTO_RESPONSABLE" header="DEPTO_RESPONSABLE" style={{ minWidth: '200px' }} sortable></Column>
                



            </DataTable>
        </div>
    </div>)
}

export default ReporteList;
