import React, { useEffect, useState } from "react";
import axios from "axios";
import Portfolio from "../scenes/Portfolio/portfolio";
import Home from "../scenes/Home/home";
import { useNavigate } from 'react-router-dom';
import ModalDialog from "./Authorization/ModalDialog";
import Cookies from 'js-cookie';


const PrivateRoute = ({ TargetComponent }) => {

    const [open, setOpen] = useState(false)
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const handleOpen = async () => {
        const loggedIn = Cookies.get('user');
        if (!loggedIn) {
            setOpen(true)
        } else {
            await axios.get('/test/closed/t', {
                withCredentials: true
            }).then(response => {
                console.log(`msg responded by api: ${response.data.msg}`);
            }).catch(error => console.error(error));
        }
    }

    const handleClose = () => {
        setOpen(false)
        navigate('/');
    }


    useEffect(() => {
        async function authenticate() {
            await axios.get('/auth/closed/verificate', { withCredentials: true }).then(response => {
                if (!(response.data.msg === 'User was authenticated')) {
                    setOpen(true)
                } else {
                    setIsAuth(true);
                }
            })
        }
        authenticate();
    })

    return (
        isAuth ? TargetComponent : < ModalDialog open={open} handleClose={handleClose} />
    )
};

export default PrivateRoute;