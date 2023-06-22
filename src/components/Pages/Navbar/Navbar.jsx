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
import { API } from "../../helpers/APIs";
import { Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [nav, setnav] = useState(localStorage.getItem("active") === "true");
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(false);
  const [menuData, setMenuData] = useState({ groups: {}, pathMenus: {} });
  const { DarkTheme, setDarkTheme } = useContext(Theme);
  const token = localStorage.getItem("accessToken");
  const token_jwt_decode = jwt_decode(token);
  const fechaActual = new Date();

  const usenavigate = useNavigate();
  const toggleCollapse = () => setIsOpen(!isOpen);
  const changeTheme = () => setDarkTheme(!DarkTheme);

  useEffect(() => {
    localStorage.setItem("active", nav.toString());
  }, [nav]);

  //Llamando la API
  useEffect(() => {
    if (token_jwt_decode.exp * 1000 < fechaActual.getTime()) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("USERS");
      localStorage.removeItem("NO_CIA");
      localStorage.removeItem("USERS");
      window.location.href = "/Login";
    } else {
      API(token).then((response) => {
        setMenuData(response);
        setMenuItems(
          Object.keys(response.groups).map((key) => ({
            title: key,
            items: response.groups[key],
            //.map((submenu) => ({
            //   title: submenu,
            //   path: response.pathMenus[submenu],
            // })),
          }))
        );
      });
    }
  }, [token, fechaActual, token_jwt_decode.exp]);

  function handleItemClick(paginas) {
    const subMenuName = menuData.pathMenus[paginas];
    console.log(subMenuName);
    usenavigate(`${subMenuName}`);
  }

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
        <Li
          className="text-decoration-none"
          title={"Dashboard"}
          Icon={HiHome}
        />
      </Link>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Interface</div>

      {/* <Link to="/mantenimiento">
        <Li Icon={VscGraphLine} title={"Mantemiento"} />
      </Link>
       */}
      <div>
        {menuItems.map((item, index) => (
          <li
            key={item.title}
            onClick={() =>
              setActiveIndex(activeIndex === index ? false : index)
            }
            style={{ listStyle: "none" }}
          >
            {activeIndex === index ? (
              <Li Icon={VscGraphLine} title={item.title} />
            ) : (
              <Li Icon={VscLayersActive} title={item.title} />
            )}
            <Collapse in={activeIndex === index}>
              <ul style={{ paddingLeft: "20px" }}>
                {item.items.map((subitem) => (
                  <li key={subitem} style={{ listStyle: "none" }}>
                    <Li
                      title={subitem}
                      onClick={() => handleItemClick(subitem)}
                    />
                  </li>
                ))}
              </ul>
            </Collapse>
          </li>
        ))}
      </div>

      {/*  <Li Icon={FiMessageSquare} title={"Messages"} />
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
*/}
      {/* <div className="divider"></div>

      <Li
        Icon={CgDarkMode}
        title={`${DarkTheme ? "LightMode" : "DarkMode"}`}
        onClick={changeTheme}
      /> */}
      {/*  <Li Icon={BiDotsHorizontalRounded} title={"More"} /> */}
    </div>
  );
};

export default Navbar;
