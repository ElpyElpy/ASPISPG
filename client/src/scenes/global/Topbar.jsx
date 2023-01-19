import { Box, Button, useTheme, Menu, MenuItem } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import ModalDialog from '../../components/Authorization/ModalDialog';
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false) // state for Oauth modal form
    const [userName, setUserName] = useState("") // state for login / logout button

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
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "0px 35px",
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
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderWidth: '1px',
                        padding: "0px 35px",
                        marginLeft: '15px',
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
        </Box>
    )
}

export default Topbar;