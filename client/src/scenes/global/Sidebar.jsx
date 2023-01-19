import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { useLocation } from 'react-router-dom';


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setSelected("Home");
        } else if (location.pathname === '/portfolio') {
            setSelected("Your portfolio");
        }
    })

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[600]} !important`,
                    borderRadius: '10px',
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: `transparent !important`,
                },
                "& .pro-inner-item": {
                    padding: "5px 5px 15px 15px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#3da58a !important",
                },
                "& .pro-menu-item.active": {
                    color: "#3da58a !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed} >
                <Menu iconShape="square">

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Home"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "35px 0 5px 20px" }}
                        >
                            Portfolios
                        </Typography>
                        <Item
                            title="Your portfolio"
                            to="/portfolio"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="All portfolios"
                            to="/allportfolios"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "35px 0 5px 20px" }}
                        >
                            Results
                        </Typography>
                        <Item
                            title="Leaderboard"
                            to="/leaderboard"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Prizes"
                            to="/prizes"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "35px 0 5px 20px" }}
                        >
                            About
                        </Typography>
                        <Item
                            title="FAQ"
                            to="/faq"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="About portfolio battle"
                            to="/aboutbattle"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="About ASPIS"
                            to="/aboutaspis"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;