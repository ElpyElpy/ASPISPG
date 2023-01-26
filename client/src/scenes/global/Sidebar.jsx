import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from 'react-router-dom';


const Item = ({ title, to, icon, selected, setSelected, ext = false, onReceiveSetMobileMenu }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => {
                setSelected(title)
                onReceiveSetMobileMenu(false)
            }}
            icon={icon}
        >
            <Typography>{title}</Typography>
            {ext ? <a href={ext} target='_blank'></a> : <Link to={to} />}

        </MenuItem>
    );
};

const Sidebar = ({ receiveCollapsed, openMobileMenu }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("All portfolios");
    const [width, setWidth] = useState(window.innerWidth);
    const [mobileOpen, setMobileOpen] = useState(true);

    const location = useLocation();

    useEffect(() => {
        setMobileOpen(!mobileOpen);

    }, [openMobileMenu])

    useEffect(() => {

        setWidth(window.innerWidth);
        if (width <= 820) {
            setIsCollapsed(true);
        }

        if (location.pathname === '/') {
            setSelected("All portfolios");
        } else if (location.pathname === '/portfolio') {
            setSelected("Your portfolio");
        }
        receiveCollapsed(isCollapsed);
    }, [width, selected, isCollapsed, mobileOpen])


    const hangleSetMobileMenu = (status) => {
        setMobileOpen(status)
    }


    return (
        (width > 820 || mobileOpen) && <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `linear-gradient(90deg, ${colors.primary[700]} 10%, ${colors.primary[800]} 90%)`,
                    borderRadius: '10px',
                    // height: "100vh",
                    width: mobileOpen ? '100%' : 'none', /////////// comment to prod
                    position: (isCollapsed && !mobileOpen) ? "relative" : "fixed",
                    // top: "0",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: `transparent !important`,
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#ebff99 !important",
                },
                "& .pro-menu-item.active": {
                    color: "#a3cc00 !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">

                    {!mobileOpen && <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h5" color={colors.grey[100]} sx={{ mr: '5px' }}>
                                    PORTFOLIO BATTLE
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>}
                    {/* onClick={() => setMobileOpen(!mobileOpen)} */}
                    {mobileOpen && <Box display="flex" alignItems="end" justifyContent="end">
                        <IconButton onClick={() => setMobileOpen(false)} sx={{ mr: '20px', mt: '10px' }}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Box>}



                    <Box paddingLeft={isCollapsed ? mobileOpen ? '0%' : undefined : "10%"} sx={{ textAlign: mobileOpen ? 'center' : 'left' }}>
                        {/* <Item
                            title="Home"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}

                        {isCollapsed ? <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "55px 0 5px 20px" }}
                        >

                        </Typography> :
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "55px 0 5px 20px" }}
                            >
                                Portfolios
                            </Typography>}
                        <Item
                            title="Your portfolio"
                            to="/portfolio"
                            icon={!mobileOpen && < InsertChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            onReceiveSetMobileMenu={hangleSetMobileMenu}
                        />
                        <Item
                            title="All portfolios"
                            to="/"
                            icon={!mobileOpen && <WorkspacesOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            onReceiveSetMobileMenu={hangleSetMobileMenu}
                        />
                        {isCollapsed ? <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "55px 0 5px 20px" }}
                        >
                        </Typography> :
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "55px 0 5px 20px" }}
                            >
                                Results
                            </Typography>}
                        <Item
                            title="Leaderboard"
                            to="/leaderboard"
                            icon={!mobileOpen && <EmojiEventsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            onReceiveSetMobileMenu={hangleSetMobileMenu}
                        />
                        <Item
                            title="Prizes"
                            ext="https://aspis.finance/battle"
                            icon={!mobileOpen && <MilitaryTechOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            onReceiveSetMobileMenu={hangleSetMobileMenu}
                        />

                        {isCollapsed ? <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "55px 0 5px 20px" }}
                        >

                        </Typography> :
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "55px 0 5px 20px" }}
                            >
                                About
                            </Typography>}
                        <Item
                            title="About portfolio battle"
                            // to="/aboutbattle"
                            ext="https://aspis.finance/battle"
                            icon={!mobileOpen && <InfoOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            onReceiveSetMobileMenu={hangleSetMobileMenu}
                        />
                        <Item
                            title="About ASPIS"
                            icon={!mobileOpen && <NewReleasesOutlinedIcon />}
                            // to="/aboutaspis"
                            ext="https://aspis.finance/"
                            selected={selected}
                            setSelected={setSelected}
                            onReceiveSetMobileMenu={hangleSetMobileMenu}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    );
};

export default Sidebar;