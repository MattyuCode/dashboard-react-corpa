import { ToastContainer, toast } from "react-toastify";
import { API_Services } from "../../../Config/APIService";
import { TokenANDnoCia } from "../../../Utilities/TokenANDnoCia.jsx";
import { useEffect, useState } from "react";
import Gantt, {
  Tasks,
  Dependencies,
  Resources,
  ResourceAssignments,
  Column,
  Editing,
  Toolbar,
  Item,
  Validation,
  ContextMenu,
} from "devextreme-react/gantt";
import CheckBox from "devextreme-react/check-box";
// import { tasks, dependencies, resources, resourceAssignments } from "./data.js";
//BUG: LINK DEL DOC. PARA EXPORTAR EN PDF || https://js.devexpress.com/Documentation/Guide/UI_Components/Gantt/Export_Data/?search=export%20to%20pdf
import { exportGantt as exportGanttToPdf } from "devextreme/pdf_exporter";
import { createRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "devextreme/dist/css/dx.light.css";
import "devextreme/dist/css/dx.common.css";
import "devexpress-gantt/dist/dx-gantt.css";
import { useNavigate } from "react-router-dom";

const Ganttchart = () => {
  const ganttRef = createRef();
  const { noCia, token } = TokenANDnoCia();
  const [tarea, setTarea] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [subProyectos, setSubProyectos] = useState([]);
  const [selectedIdSubProyectos, setSelectedIdSubProyectos] = useState(0);
  const [selectedIdProyectos, setSelectedIdProyectos] = useState(0);
  const [selectedTask, setSelectedTask] = useState(0);
  //let valor = 0;

  const usenavigate = useNavigate();

  const [ganttConfig, setGanttConfig] = useState({
    showResources: false,
    disableContextMenu: false,
    contextMenuItems: getContextMenuItems(),
  });

  const handleTaskClick = (e) => {
    
    const rowId = e.data.id;
    setSelectedTask(e.key);
    localStorage.setItem("taskSel", e.key);
  }

  const DecodeformatDate = (date) => {
    const fecha = date.split(" ");
    const parts = fecha[0].split("/");
    const fechaObjeto =
      parts[2] + "-" + parts[1] + "-" + parts[0] + "T00:00:00";
    return fechaObjeto;
  };

  const exportButtonOptions = {
    icon: "exportpdf",
    hint: "Export to PDF",
    stylingMode: "text",
    onClick: () => {
      exportButtonClick();
    },
    // onClick: "exportButtonClick",
  };

  const exportButtonClick = () => {
    const gantt = ganttRef.current.instance;
    exportGanttToPdf({
      component: gantt,
      createDocumentMethod: (args) => new jsPDF(args),
      format: "auto",
      exportMode: "all",
      dateRange: "visible",
    }).then((doc) => doc.save("gantt.pdf"));
  };

  useEffect(() => {
    const API_PROYECTO = async () => {
      try {
        const response = await fetch(
          `${API_Services}/PROYECTO/Select/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataProyecto = await response.json();
        setProyectos(dataProyecto);
      } catch (error) {
        
      }
    };

    const API_SUBPROYECTO = async () => {
      try {
        const response = await fetch(
          `${API_Services}/SUBPROYECTO/Select/${noCia}/${selectedIdProyectos}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataSubProyecto = await response.json();
        setSubProyectos(dataSubProyecto);
      } catch (error) {
       
      }
    };
    API_PROYECTO();
    API_SUBPROYECTO();
  }, [noCia, token, selectedIdProyectos]);

  const mT = tarea.map((item) => ({
    id: item.ID,
    parentId: item.ID_TAREAPADRE,
    title: item.NOMBRE_TAREA,
    start: DecodeformatDate(item.FECHA_INICIO),
    end: DecodeformatDate(item.FECHA_FIN),
    progress: item.AVANCE,
  }));

  const llamarApiGannt = async () => {
    if (
      selectedIdSubProyectos !== 0 &&
      selectedIdSubProyectos !== "DEFAULT" &&
      selectedIdProyectos !== 0
    ) {
      try {
        const response = await fetch(
          `${API_Services}/TAREA/Selectpr_tarea_subtarea/${noCia}/${selectedIdSubProyectos}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        setTarea(data);
      } catch (error) {
       
      }
      document.getElementById("idSubproyecto").classList.remove("is-invalid");
      document.getElementById("idProyecto").classList.remove("is-invalid");
    } else {
      document.getElementById("idSubproyecto").classList.add("is-invalid");
      document.getElementById("idProyecto").classList.add("is-invalid");
      toast.error("Todos los campos son obligatorios", {
        theme: "colored",
      });
    }
  };

  const dependencies = tarea.map((item) => ({
    id: item.ID,
    predecessorId: item.ID_TAREAPREDECESORA,
    successorId: item.ID,
    type: 0,
  }));

  function onCustomizeContextMenu(e) {
    setGanttConfig({
      ...ganttConfig,
      contextMenuItems: e.value ? getContextMenuItems() : undefined,
    });
  }
 
  

  function getContextMenuItems() {
    return [
      "addTask",
      "taskdetails",
      "deleteTask",
      {
        name: "Ver detalles en tarea",
        text: "Ver detalles en tarea",
        onClick: (e) => {
          
          window.open(`${window.location.origin}/${`detailsTarea/${localStorage.getItem("NO_CIA")}/${localStorage.getItem("taskSel")}`}`);
         
        },
  
      },
    ];
  }

  return (
    <>
      <div className="v">
        <div className="row col-md-8" style={{ paddingLeft: "30px" }}>
          <div className="col-md-4 mb-4">
            <div className="form-outline">
              <label className="form-label m-0">Proyecto</label>
              <select
                className="form-select"
                id="idProyecto"
                name="idProyecto"
                value={selectedIdProyectos}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue !== "DEFAULT") {
                    setSelectedIdProyectos(e.target.value);
                  } else {
                    setSelectedIdProyectos("");
                  }
                }}
              >
                <option value="DEFAULT">Selecciona un Proyecto</option>
                {proyectos.map((item) => (
                  <option key={item.ID} value={item.ID}>
                    {item.DESCRIPCION}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="form-outline">
              <label className="form-label m-0">Subproyecto</label>
              <select
                className="form-select"
                id="idSubproyecto"
                name="idSubproyecto"
                value={selectedIdSubProyectos}
                onChange={(e) => {
                  setSelectedIdSubProyectos(e.target.value);
                  // const selectedValue = e.target.value;
                  // if (selectedValue !== "DEFAULT") {
                  //   listEtapa(e.target.value);
                  //   listActividad(e.target.value);
                  //   listAdvertencia(e.target.value);
                  // } else {
                  //   setSelectedIdSubProyectos("");
                  // }
                }}
              >
                <option value="DEFAULT">Selecciona un Subproyecto</option>
                {subProyectos.map((item) => (
                  <option key={item.ID} value={item.ID}>
                    {item.NOMBRE}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <br />
            <button
              onClick={llamarApiGannt}
              className="btn btn-outline-success"
            >
              Generar
            </button>
          </div>
        </div>
      </div>

      <div className="option" style={{ display: "none" }}>
        <CheckBox defaultValue={true} onValueChanged={onCustomizeContextMenu} />
      </div>

      <Gantt ref={ganttRef} taskListWidth={500} scaleType="weeks" height={700} onTaskClick={handleTaskClick} >
      <ContextMenu  items={ganttConfig.contextMenuItems} />

        <Tasks dataSource={mT} />
        <Dependencies dataSource={dependencies} />
        {/* <Resources dataSource={resources} />
        <ResourceAssignments dataSource={resourceAssignments} /> */}

        <Toolbar>
          <Item name="undo" />
          <Item name="redo" />
          <Item name="separator" />
          <Item name="collapseAll" />
          <Item name="expandAll" />
          <Item name="separator" />
          {/* <Item
            widget="dxButton"
            location="before"
            options={exportButtonOptions}
          /> */}
          <Item
            widget="dxButton"
            location="before"
            options={exportButtonOptions}
          />
          <Item name="addTask" />
          <Item name="deleteTask" />
          <Item name="separator" />
          <Item name="zoomIn" />
          <Item name="zoomOut" />
        </Toolbar>

        <Column dataField="id"    caption="ID"    width={70}  />
        <Column dataField="title" caption="Tarea" width={300} />
        <Column dataField="start" caption="Inicio" />
        <Column dataField="end"   caption="Fin" />

        <Validation autoUpdateParentTasks />
        <Editing disabled />
      </Gantt>
      <ToastContainer />
    </>
  );
};

export default Ganttchart;
