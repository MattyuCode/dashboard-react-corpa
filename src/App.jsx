import { BrowserRouter as MyRoute, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Home/Dashboard";
import Navbar from "./components/Pages/Navbar/Navbar";
import NavTop from "./components/Pages/Header/NavTop";
import Utilities from "./components/Pages/Utilities/Utilities";
import Login from "./components/Auth/Login";
import Mantenimiento from "./components/Pages/Mantemiento/Mantenimiento";

import Actividad from "./components/Pages/Mantemiento/Actividad/Actividad";
import CreateActividad from "./components/Pages/Mantemiento/Actividad/Create/CreateActividad";
import EditActividad from "./components/Pages/Mantemiento/Actividad/Edit/EditActividad";
import DetailsActivity from "./components/Pages/Mantemiento/Actividad/Detalles/DetailsActivity";

import Area from "./components/Pages/Mantemiento/Area/Area";
import CreateArea from "./components/Pages/Mantemiento/Area/Create/CreateArea";
import EditArea from "./components/Pages/Mantemiento/Area/Edit/EditArea";
import DetailsArea from "./components/Pages/Mantemiento/Area/Detalles/DetailsArea";

import Equipo from "./components/Pages/Mantemiento/Equipo/Equipo";
import CreateEquipo from "./components/Pages/Mantemiento/Equipo/Create/CreateEquipo";
import EditEquipo from "./components/Pages/Mantemiento/Equipo/Edit/EditEquipo";
import DetailsEquipo from "./components/Pages/Mantemiento/Equipo/Detalles/DetailsEquipo";

import Etapa from "./components/Pages/Mantemiento/Etapa/Etapa";
import CreateEtapa from "./components/Pages/Mantemiento/Etapa/Create/CreateEtapa";
import EditEtapa from "./components/Pages/Mantemiento/Etapa/Edit/EditEtapa";
import DetailsEtapa from "./components/Pages/Mantemiento/Etapa/Detalles/DetailsEtapa";

import LugarAdvertencia from "./components/Pages/Mantemiento/Advertencia/Advertencia";
import CreateAdvertencia from "./components/Pages/Mantemiento/Advertencia/Create/CreateAdvertencia";
import EditAdvertencia from "./components/Pages/Mantemiento/Advertencia/Edit/EditAdvertencia";
import DetallesAdvertencia from "./components/Pages/Mantemiento/Advertencia/Detalles/DetallesAdvertencia";

import Parte from "./components/Pages/Mantemiento/Parte/Parte";
import CreateParte from "./components/Pages/Mantemiento/Parte/Create/CreateParte";
import DetailsParte from "./components/Pages/Mantemiento/Parte/Detalles/DetailsParte";
import EditParte from "./components/Pages/Mantemiento/Parte/Edit/EditParte";

import Proyecto from "./components/Pages/Mantemiento/Proyecto/Proyecto";

import CreateProyecto from "./components/Pages/Mantemiento/Proyecto/create/CreateProyecto";
import CreateSubProyecto from "./components/Pages/Mantemiento/Proyecto/create/CreateSubProyecto";
import DetailsProyect from "./components/Pages/Mantemiento/Proyecto/Detalle/DetailsProyect"
import SubArea from "./components/Pages/Mantemiento/SubArea/SubArea";
import Tarea from "./components/Pages/Mantemiento/Tarea/Tarea";
import { Theme } from "./components/JS/Theme";
import { useEffect, useState } from "react";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [DarkTheme, setDarkTheme] = useState(
    localStorage.getItem("DarkTheme") === "true"
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("DarkTheme", DarkTheme.toString());
  }, [DarkTheme]);

  return (
    <MyRoute>
      <section className={`${DarkTheme && "dark"}`}>
        <Theme.Provider value={{ DarkTheme, setDarkTheme }}>
          {isAuthenticated ? (
            <>
              <div className="navTop">{<Navbar />}</div>
              <div className="NavbMenu">
                <NavTop />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  
                  <Route path="/actividad" element={<Actividad />} />
                  <Route path="/crearActividad" element={<CreateActividad />} />
                  <Route path="/editarActividad/:ID" element={< EditActividad/>} />
                  <Route path="/detailsActividad/:noCia/:ID" element={<DetailsActivity/>} />

                  
                  <Route path="/area" element={<Area />} />
                  <Route path ="/createArea" element={<CreateArea/>}/>
                  <Route path ="/editarArea/:ID" element={<EditArea/>}/>
                  <Route path="/detailsArea/:noCia/:ID" element={<DetailsArea/>} />


                  <Route path="/equipo" element={<Equipo />} />
                  <Route path="/crearEquipo" element={  <CreateEquipo/>} />
                  <Route path="/editarEquipo/:ID" element={  <EditEquipo/>} />
                  <Route path="/detailsEquipo/:noCia/:ID" element={  <DetailsEquipo/>} />
                

                  <Route path="/etapa" element={<Etapa />} />
                  <Route path="/crearEtapa" element={<CreateEtapa />} />
                  <Route path="/editarEtapa/:ID" element={<EditEtapa />} />
                  <Route path="/detallesEtapa/:noCia/:ID" element={<DetailsEtapa />} />

                  <Route path="/lugarAdvertencia" element={<LugarAdvertencia />} />
                  <Route path="/createAdvertencia" element={<CreateAdvertencia />} />
                  <Route path="/editarAdvertencia/:ID" element={<EditAdvertencia />} />
                  <Route path="/detallesAdvertencia/:noCia/:ID" element={<DetallesAdvertencia />} />

                  <Route path="/parte" element={<Parte />} />
                  <Route path="/createParte" element={<CreateParte />} />
                  <Route path="/editParte/:ID" element={<EditParte />} />
                  <Route path="/detailsParte/:noCia/:ID" element={<DetailsParte />} />

                  <Route path="/proyecto" element={<Proyecto />} />
                  <Route path="/crearProyecto/:ID" element={<CreateProyecto />} />
                  <Route path="/crearSubProyecto/:ID/:IDSUBPROYECTO/:OPERACION" element={<CreateSubProyecto />} />
                  <Route path="/DetailsProyect/:ID" element={<DetailsProyect />} />
                  
                  <Route path="/subarea" element={<SubArea />} />

                  <Route path="/tarea" element={<Tarea />} />

                  <Route path="/Utilities" element={<Utilities />} />
                  <Route path="/mantenimiento" element={<Mantenimiento />} />
                </Routes>
              </div>
            </>
          ) : (
            <Login />
          )}
        </Theme.Provider>
      </section>
    </MyRoute>
  );
}

export default App;
