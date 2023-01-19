import { Button, Typography, useTheme, Card, CardContent, CardMedia } from "@mui/material";
import { tokens } from "../../theme";
import PicForHome from "../../assets/observePortfolio.svg";
import axios from "axios";

const HomeCardObserve = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleClick = async () => {
        await axios.post('/test/closed/t', { "msg": "Elpy" }, {
            withCredentials: true
        }).then(response => {
            console.log(`msg responded by api: ${response.data.msg}`);
        }).catch(error => console.error(error));
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
                    OBSERVE ALL PORTFOLIOS
                </Typography>
                <Typography
                    variant="h6"
                    color={colors.greenAccent[400]}
                >
                    See your competitors and their strategies
                </Typography>
                <Button size="large" variant="outlined" color="secondary" sx={{ color: colors.grey[100], marginTop: "15px" }} onClick={handleClick}>OBSERVE</Button>
            </CardContent>
        </Card >
    );
};

export default HomeCardObserve;