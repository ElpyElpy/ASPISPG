import { Box, Button, IconButton, Typography, useTheme, InputBase, Grid } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import SearchIcon from "@mui/icons-material/Search";
import fetchAllPortfolios from "../../services/fetchAllPortfolios";
import { useEffect, useState } from "react";
import HomeCardCreate from "../../components/HomeCards/HomeCardCreate";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';


const AllPortfolios = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [portfolios, setPortfolios] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredPortfolios, setFilteredPortfolios] = useState(null);
    const [hasPortfolioCookie, setHasPortfolioCookie] = useState(Cookies.get('hasPortfolio'));
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setWidth(window.innerWidth);
        setHasPortfolioCookie(Cookies.get('hasPortfolio'));
        // portfolios && setFilteredPortfolios(portfolios.filter(portfolio => portfolio.portfolio_name.toLowerCase().includes(search)))
        async function getAllPortfolios() {
            const data = await fetchAllPortfolios();
            if (data.msg === 'no portfolios') {
                return;
            } else {
                data.sort((a, b) => {
                    const changeA = parseFloat(a.change.replace("%", ""));
                    const changeB = parseFloat(b.change.replace("%", ""));
                    return changeB - changeA;
                })

                setPortfolios(data);
            }
        }
        !portfolios && getAllPortfolios();
    }, [search, filteredPortfolios])



    const filterBySearch = (event) => {
        setSearch(event.target.value);
        // Access input value
        const query = event.target.value;
        console.log(query);
        // Create copy of item list
        var updatedList = [...portfolios];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
            return item.portfolio_name.toLowerCase().includes(query);
        }
        );
        // Trigger render with updated values
        setFilteredPortfolios(updatedList);
    };



    return (
        <Box m="20px">
            {hasPortfolioCookie === 'false' && <Box mb="50px">
                <motion.div
                    className="box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        default: {
                            duration: 0.3,
                            ease: [0, 0.71, 0.2, 1.01]
                        },
                        scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001
                        }
                    }}>
                    <HomeCardCreate width={width} />
                </motion.div>
            </Box>}
            {/* HEADER SECTION */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"ALL PORTFOLIOS"} subtitle={"Observe competitors"} width={width} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[600]}
                        borderRadius="10px"
                        border="1px solid"
                        borderColor={colors.primary[300]}
                    >
                        <InputBase sx={{
                            ml: 2,
                            flex: 1,
                            color: colors.primary[100],
                            backgroundColor: colors.primary[600],
                            maxWidth: width <= 500 ? "50px" : "100px"
                        }}
                            placeholder="Search"

                            onChange={filterBySearch}
                        />
                        <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon sx={{ color: colors.grey[100] }} />
                        </IconButton>
                    </Box>
                    {/* <Box>
                        <IconButton>
                            <SortOutlinedIcon sx={{ color: colors.grey[100] }} />
                        </IconButton>
                    </Box> */}
                    <Box>
                        <IconButton>
                            <ShareOutlinedIcon sx={{ color: colors.grey[100] }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            {
                portfolios && <Grid container spacing={2} mt="10px">
                    {search === '' && portfolios.map((pf, index) => (

                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                            <motion.div
                                className="box1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    default: {
                                        duration: 0.9,
                                        ease: [0, 0.71, 0.2, 1.01]
                                    },
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}>
                                <PortfolioCard portfolio={pf} />
                            </motion.div>
                        </Grid>

                    ))}
                    {search !== '' && portfolios && filteredPortfolios.map((pf, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                            <motion.div
                                className="box1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    default: {
                                        duration: 0.9,
                                        ease: [0, 0.71, 0.2, 1.01]
                                    },
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}>
                                <PortfolioCard portfolio={pf} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            }



        </Box >
    )
}

export default AllPortfolios;