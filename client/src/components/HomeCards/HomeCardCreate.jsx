import { Button, Typography, useTheme, Card, CardContent, CardMedia, Box } from "@mui/material";
import { tokens } from "../../theme";
import PicForHome from "../../assets/createPortfolio4.svg";
import PicFormHomeSmall from "../../assets/createPortfolio5.svg";
import ModalDialog from "../Authorization/ModalDialog";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const HomeCardCreate = ({ width }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const handleOpen = async () => {
        const loggedIn = Cookies.get('user');
        if (!loggedIn) {
            setOpen(true)
        } else {
            navigate('/portfolio');
            // await axios.get('/test/closed/t', {
            //     withCredentials: true
            // }).then(response => {
            //     console.log(`msg responded by api: ${response.data.msg}`);
            // }).catch(error => console.error(error));
        }
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (

        <Card sx={{ position: 'relative', boxShadow: '0 0 10px 3px #ca20a3, inset 0 0 5px #ca20a3', background: `linear-gradient(135deg, ${colors.primary[400]} 10%, ${colors.primary[800]} 90%)`, borderColor: colors.greenAccent[500], borderRadius: "14px" }}>
            <CardMedia
                component="img"
                sx={{ height: "20vh", objectFit: '-moz-initial' }}
                image={width <= 500 ? PicFormHomeSmall : PicForHome}
                title="create portfolio"
            />

            <Box position="absolute" top="20%" left={width <= 500 ? "5%" : "2%"} transform="translate(-50%, -50%)" z-index="1" >
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
                <Button size="large" variant="outlined" color="secondary" sx={{ color: colors.grey[100], marginTop: "15px", borderColor: colors.redAccent[500] }} onClick={handleOpen}>CREATE</Button>
            </Box>
            <ModalDialog open={open} handleClose={handleClose} />
        </Card >
    );
};

export default HomeCardCreate;