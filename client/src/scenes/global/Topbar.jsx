import { Box, Button, useTheme, Menu, MenuItem, IconButton } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import ModalDialog from '../../components/Authorization/ModalDialog';
import Cookies from 'js-cookie';
import axios from "axios";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ onReceiveOpenMobileMenu }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false) // state for Oauth modal form
    const [userName, setUserName] = useState("") // state for login / logout button
    const [width, setWidth] = useState(window.innerWidth);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogOut = async () => {
        await axios.get('/auth/closed/logout', {
            withCredentials: true
        }).then(response => {
            navigate('/');
        }).catch(error => console.error(error));

        Cookies.remove('user');
        setUserName("");
        setAnchorEl(null);
    }

    const handleShrink = () => {
        setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const expand = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };



    useEffect(() => {
        setWidth(window.innerWidth);
        onReceiveOpenMobileMenu(openMobileMenu);
        function loadUserData() {
            const data = Cookies.get('user');
            if (data !== null) {
                setUserName(data);
            }
        }
        loadUserData();


    }); // pass an empty dependency array to only run the effect once on mount



    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                borderRadius="3px"
                marginTop="7px"
                marginLeft="10px"
            >
                <img
                    alt="profile-user"
                    width="80px"
                    height="30px"
                    src={`../../assets/logo3.png`}
                    style={{ cursor: "pointer" }}
                />
            </Box>

            {/* Buttons */}
            <Box display="flex">
                {userName === undefined && <Button
                    sx={{
                        backgroundColor: colors.greenAccent[700],
                        color: colors.grey[100],
                        fontSize: width <= 820 ? '10px' : "12px",
                        fontWeight: "bold",
                        padding: width <= 820 ? "0px 10px" : "0px 35px",
                        marginLeft: '15px',
                    }}
                    onClick={handleOpen}
                >
                    Sign up / Log in
                </Button>}
                {userName !== undefined && <Button
                    sx={{
                        color: colors.grey[100],
                        borderRadius: '15px',
                        fontSize: width <= 820 ? '10px' : "12px",
                        fontWeight: "bold",
                        borderWidth: '1px',
                        padding: width <= 820 ? "0px 10px" : "0px 35px",
                        marginLeft: '15px',
                        background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[700]} 90%)`,
                        borderColor: colors.grey[200],
                    }}
                    id="basic-demo-button"
                    aria-controls={expand ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={expand ? 'true' : undefined}
                    variant="outlined"
                    color="neutral"
                    onClick={handleClick}
                >
                    {userName}
                </Button>}
                {width <= 820 && <IconButton aria-label="delete" sx={{ ml: '20px' }} onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    <MenuOutlinedIcon />
                </IconButton>}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={expand}
                    onClose={handleShrink}
                    aria-labelledby="basic-demo-button"
                >
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </Box>
            <ModalDialog open={open} handleClose={handleClose} />
        </Box >
    )
}

export default Topbar;