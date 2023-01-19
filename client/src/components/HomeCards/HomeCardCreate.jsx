import { Button, Typography, useTheme, Card, CardContent, CardMedia } from "@mui/material";
import { tokens } from "../../theme";
import PicForHome from "../../assets/createPortfolio.svg";
import ModalDialog from "../Authorization/ModalDialog";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const HomeCardCreate = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false)

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
    }


    return (

        <Card sx={{ backgroundColor: colors.primary[500], border: "solid", borderRadius: "14px" }}>
            <CardMedia
                component="img"
                sx={{ height: 350, objectFit: "-moz-initial" }}
                image={PicForHome}
                title="create portfolio"
            />

            <CardContent sx={{ marginTop: "5px" }}>
                <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                >
                    CREATE PORTFOLIO
                </Typography>
                <Typography
                    variant="h6"
                    color={colors.greenAccent[400]}
                >
                    Start managing virtual assets and get prizes
                </Typography>
                <Button size="large" variant="outlined" color="secondary" sx={{ color: colors.grey[100], marginTop: "15px" }} onClick={handleOpen}>CREATE PORTFOLIO</Button>
            </CardContent>
            <ModalDialog open={open} handleClose={handleClose} />
        </Card >
    );
};

export default HomeCardCreate;