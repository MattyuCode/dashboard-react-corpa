import { Link } from "react-router-dom";
import { Theme } from "../../JS/Theme";
import "./Navbar.css";
import profileImg from "../../../assets/CORPACAM.png";

import { FiMessageSquare } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { TbFileUpload } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";
import {
  AiOutlineUsergroupAdd,
  AiOutlineDollarCircle,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiMessageAltAdd, BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { useEffect, useContext, useState } from "react";
import Li from "./NavIconTitle/Li";
// import { API } from "../helpers/APIs";
import { Collapse } from "react-bootstrap";

const Navbar = () => {
  const [nav, setnav] = useState(localStorage.getItem("active") === "true");
  const { DarkTheme, setDarkTheme } = useContext(Theme);
  const changeTheme = () => setDarkTheme(!DarkTheme);
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);
  const [groups, setGroups] = useState({});
  useEffect(() => {
    localStorage.setItem("active", nav.toString());
  }, [nav]);



  const url =
  "https://apiproyectosdesarrollo.corpacam.com.gt/api/GetMenus/GetMenu/";

 const API = async (token) => {
  const datos = "10/ADMINISTRADOR/CPR";
  try {
    const response = await fetch(url + datos, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    const groups = {};
    data.forEach((items) => {
      // console.log(items);
      if (!groups[items.DESCRIP_MENU]) {
        groups[items.DESCRIP_MENU] = [];
      }
      // groups[items.DESCRIP_MENU].push(items.DESCRIP_MENU);
      groups[items.DESCRIP_MENU].push(items.DESCRIP_SUBMENU);
    });
    // console.log("En la funcion", data);
    for (const group in groups) {
      //  console.log(group);
      // console.log(groups[group]);
      groups[group].forEach((submenu) => {
        //  console.log(submenu);
      });
    }
    return groups;
  } catch (error) {
    console.log(error);
  }
};







  const Li = ({ Icon, title }) => (
    <>
      <Icon />
      <span>{title}</span>
    </>
  );

  const loadMenu = async (token) => {
    const res = await API(token);
    console.log(res); 
    const tempGroup = {};
    res.data.menu.forEach((element) => {
      if (!tempGroup[element.groups]) {
        tempGroup[element.groups] = [];
      }
      tempGroup[element.groups].push(element);
    });
    setGroups(tempGroup);
  };

  const renderSubmenu = (subMenu) => {
    return subMenu.map((menu) => {
      <li style={{ listStyle: "none" }} key={menu.link}>
        <Link to={menu.link}>{menu.name}</Link>
      </li>;
    });
  };

  const renderMenu = () => {
    const menuArr = [];
    for (const group in groups) {
      const subMenu = groups[group];
      menuArr.push(
        <li onClick={toggleCollapse} style={{ listStyle: "none" }} key={group}>
          {isOpen ? (
            <>
              <Li Icon={VscGraphLine} title={group} />
              <ul>{renderSubmenu(subMenu)}</ul>
            </>
          ) : (
            <Li Icon={VscGraphLine} title={group} />
          )}
        </li>
      );
    }
    return menuArr;
  };
  const token = localStorage.getItem("accessToken");
  loadMenu(token);

  return (
    <div className={`navigation ${nav && "active"} ${DarkTheme && "dark"}`}>
      <div
        className={`menu ${nav && "active"}`}
        onClick={() => {
          setnav((prevState) => !prevState);
        }}
      >
        {nav ? (
          <AiOutlineMenu className="menu-icon" />
        ) : (
          <IoMdClose className="menu-icon" />
        )}
      </div>

      <header>
        <div className="profile">
          <img className="profiel-img" src={profileImg} alt="" />
        </div>
        <span>CORPACAM</span>
      </header>

      {/* <hr className="sidebar-divider my-0" /> */}
      {/* 
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <HiHome/>
            <span>Dashboard</span>
          </Link>
        </li> */}

      <Link to="/">
        <Li title={"Dashboard"} Icon={HiHome} />
      </Link>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Interface</div>

      {renderMenu()}
      {/* <Link to="/mantenimiento">
        <Li Icon={VscGraphLine} title={"Mantemiento"} />
      </Link>
       */}
      {/* <div>
        <li onClick={toggleCollapse} style={{ listStyle: "none" }}>
          {isOpen ? (
            <Li Icon={VscGraphLine} title={"Mantemiento"} />
          ) : (
            <Li Icon={VscGraphLine} title={"Mantemiento"} />
          )}
        </li>
        <Collapse in={isOpen}>
          <ul>
            <li className="l-i">
              <Link to="/actividades">
                <Li Icon={VscLayersActive} title={"Actividades"} />
              </Link>
            </li>
            <li className="l-i">
              <Link to="/area">
                <Li Icon={VscLayersActive} title={"Area"} />
              </Link>
            </li>
            <li className="l-i">
              <Link to="/equipo">
                <Li Icon={VscLayersActive} title={"Equipo"} />
              </Link>
            </li>
            <li className="l-i">
              <Link to="/etapa">
                <Li Icon={VscLayersActive} title={"Etapa"} />
              </Link>
            </li>
          </ul>
        </Collapse>
      </div> */}

      {/* <Li Icon={FiMessageSquare} title={"Messages"} />
      <Li Icon={AiOutlineUsergroupAdd} title={"Followers"} />

      <div className="divider"></div>
      <div className="sidebar-heading">Addons</div>

      <Link to="/Utilities">
        <Li Icon={MdOutlineNotificationsActive} title={"Utilities"} />
      </Link>

      <Li Icon={RiAccountCircleLine} title={"Following"} />
      <Li Icon={AiOutlineDollarCircle} title={"Earnings"} />
      <Li Icon={TbFileUpload} title={"Posts"} />
      <Li Icon={BiMessageAltAdd} title={"Message Requests"} />
      <Li Icon={AiOutlineUserSwitch} title={"Change Account"} />

      <div className="divider"></div>

      <Li
        Icon={CgDarkMode}
        title={`${DarkTheme ? "LightMode" : "DarkMode"}`}
        onClick={changeTheme}
      />

      <Li Icon={BiDotsHorizontalRounded} title={"More"} /> */}
    </div>
  );
};

export default Navbar;
