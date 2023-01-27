import Header from "../../components/Header";
import { Box, IconButton, Card, useTheme, CardContent, Grid, Avatar, Typography } from "@mui/material";
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import HomeCardCreate from "../../components/HomeCards/HomeCardCreate";
import HomeCardObserve from "../../components/HomeCards/HomeCardObserve";

const Home = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box m="20px">
            <Grid container spacing={4} justify="center" marginTop="30px">
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <HomeCardCreate />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <HomeCardObserve />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;