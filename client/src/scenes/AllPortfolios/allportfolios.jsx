import { Box, Button, IconButton, Typography, useTheme, InputBase, Grid } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import SearchIcon from "@mui/icons-material/Search";


const AllPortfolios = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box m="20px">
            {/* HEADER SECTION */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"ALL PORTFOLIOS"} subtitle={"Observe competitors"} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="3px"
                    >
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                        <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <Box>
                        <IconButton>
                            <ShareOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <PortfolioCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <PortfolioCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <PortfolioCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <PortfolioCard />
                </Grid>
            </Grid>

            {/* PORTFOLIOS SECTION */}
            {/* <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="12vh"
                gap="10px"
            >
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="5px"
                >
                    <PortfolioCardTest />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="5px"
                >
                    <PortfolioCardTest />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="5px"
                >
                    <PortfolioCardTest />
                </Box> */}
            {/* </Box> */}
        </Box >

    )
}

export default AllPortfolios;