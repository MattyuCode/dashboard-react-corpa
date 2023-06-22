import { Theme } from "../../JS/Theme";
import { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiFillYoutube, AiFillGithub } from "react-icons/ai";
// import { RiSettingsLine } from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io5";
// import { TbMessages } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import profileImg from "../../../assets/CORPACAM.png";
import { HiOutlineMoon, HiSun } from "react-icons/hi";
import "./NavTop.css";
import { API_Services } from "../../Config/APIService";
import { TokenANDnoCia } from "../../Utilities/TokenANDnoCia";

const NavTop = () => {
  const { DarkTheme, setDarkTheme } = useContext(Theme);
  const changeTheme = () => setDarkTheme(!DarkTheme);
  const { noCia, token } = TokenANDnoCia();
  const [usuario, setUsuario] = useState(localStorage.getItem("USERS"));
  const [listProyectos, setProyectos] = useState([]);
  const [selectedIdProyectos, setSelectedIdProyectos] = useState("");
  const [subProyectos, setSubProyectos] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("USERS");
    localStorage.removeItem("NO_CIA");
    setUsuario(null);
    console.log("Funcionando");
    window.location.href = "/Login";
  };

  useEffect(() => {
    const APIs = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API_Services}/PROYECTO/Select/${noCia}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${API_Services}/SUBPROYECTO/Select/${noCia}/${selectedIdProyectos}`,
            // PROYECTO/SelectProSub/10/3
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);
        const data = await Promise.all(
          responses.map((response) => response.json())
        );
        const [proyectos, subproyectos] = data;
        setProyectos(proyectos.sort((a, b) => a.ID - b.ID));
        setSubProyectos(subproyectos.sort((a, b) => a.ID - b.ID));
        // console.log(proyectos, subProyectos);
      } catch (error) {
        console.log(error);
      }
    };

    APIs();
  }, [noCia, token, selectedIdProyectos]);

  return (
    <div className={`d-flex flex-column content-wrapper`}>
      <div className="content">
        <nav
          className={`navbar navbar-expand topbar mb-4 static-top shadow ${
            DarkTheme && "dark"
          }`}
        >
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="search-bar">
              <input type="text" placeholder="search..." />
              <BiSearch className="icon" />
            </div>
          </form>

          <ul className="navbar-nav mr-auto">
            <select
              className="form-select"
              name=""
              id=""
              value={selectedIdProyectos}
              onChange={(e) => setSelectedIdProyectos(e.target.value)}
            >
              <option value="DEFAULT">Selecciona un Proyecto</option>
              {listProyectos.map((proyecto) => (
                <optgroup label={proyecto.DESCRIPCION} key={proyecto.ID}>
                  {subProyectos.map((subproyecto) => (
                    <option value={subproyecto.ID} key={subproyecto.ID}>
                      {subproyecto.NOMBRE}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </ul>

          <div className="topbar-divider d-none d-sm-block"></div>
          <ul className="navbar-nav ml-auto">
            <div className="tools">
              {/* <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub className="icon" />
              </a> */}
              {/* <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillYoutube className="icon" />
              </a> */}

              {/* <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoFacebook className="icon" />
              </a> */}
              {/* <div className="divider"></div> */}

              {/* <HiOutlineMoon className="icon" onClick={changeTheme} /> */}
              {/* {DarkTheme ? (
                <HiSun className="icon" onClick={changeTheme} />
              ) : (
                <HiOutlineMoon className="icon" onClick={changeTheme} />
              )} */}
              {/* <RiSettingsLine className="icon" /> */}
              <FiLogOut className="icon" onClick={handleLogout} />

              <div className="divider"></div>
              <span>{usuario}</span>

              <div className="user">
                <img className="profiel-img" src={profileImg} alt="" />
              </div>
            </div>
            <li className="nav-item dropdown no-arrow"></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavTop;
