import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaFolderOpen } from "react-icons/fa";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiFillHome,
  AiFillInfoCircle,
  AiOutlineTable,
} from "react-icons/ai";
import torrentLogo from "../assets/logoTorrent.png";

export default function Sidebar() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#000", size: "1.4rem" }}>
        <div id="sideBar" className="sideBar" Style="grid-area:sidebar">
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <img className="logoTorrent" src={torrentLogo} />
              <div className="closemenu" onClick={menuIconClick} alt="Menu">
                {menuCollapse ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
              </div>
            </SidebarHeader>

            <SidebarContent>
              <Menu iconShape="square">
                <SubMenu title="Páginas" icon={<FaFolderOpen />}>
                  <MenuItem title="tabela" icon={<AiOutlineTable />}>
                    <Link to="/tabela">Tabela</Link>
                  </MenuItem>
                  {/* <MenuItem title="home" icon={<AiFillHome />}>
                    <Link to="/home">Home</Link>
                  </MenuItem>
                  <MenuItem title="info" icon={<AiFillInfoCircle />}>
                    <Link to="/info">Info</Link>
                  </MenuItem> */}
                </SubMenu>
              </Menu>
            </SidebarContent>

            <SidebarFooter></SidebarFooter>
          </ProSidebar>
        </div>
      </IconContext.Provider>
    </>
  );
}
