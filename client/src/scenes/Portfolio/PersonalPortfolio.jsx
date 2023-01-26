import { Box, IconButton, useTheme, Grid } from "@mui/material";
import PortfolioHeader from "../../components/PortfolioHeader";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox/StatBox";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SomeonePortfolioTable from "../../components/PortfolioTable/SomeonePortfolioTable";
import LineChart from "../../components/LineChart/LineChart"
import { useEffect, useState } from "react";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import fetchSomeonePortfolioData from "../../services/fetchSomeonePortfolioData";





const PersonalPortfolio = ({ navigation, isCollapsed }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [portfolioName, setPortfolioName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [coins, setCoins] = useState(null);
    const [aum, setAum] = useState(null);
    const [change, setChange] = useState(null);
    const [rank, setRank] = useState(null);
    const [gotToken, setGotToken] = useState(false);
    const [transactions, setTransactions] = useState(null);
    const [userId, setUserId] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);
    const [chartPeriod, setChartPeriod] = useState('minute');
    const [width, setWidth] = useState(window.innerWidth);

    const location = useLocation();


    useEffect(() => {
        setUserId(location.state.id);
        setWidth(window.innerWidth);
        async function getCoins() {
            const data = await fetchSomeonePortfolioData(userId, chartPeriod);
            setHistoricalData(data.historicalPortfolioValue);
            setCoins(data.portfolio);
            setAum(data.aum);
            setChange(data.changeTotal);
            setRank(`${data.rank} place`);
            setTransactions(data.transactions);
            setPortfolioName(data.portfolioData.portfolio_name);
            setImageUrl(data.icon);

        }
        if (userId) {
            getCoins();
        }
    }, [userId, chartPeriod])

    const handleChartPeriod = (period) => {
        setChartPeriod(period);
    }

    const handleSwapData = async (status) => {
        setGotToken(!gotToken);
    }

    return (
        <Box m="20px">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <PortfolioHeader title={portfolioName ? portfolioName.toUpperCase() : ""} subtitle={"Observe your results"} avatarUrl={imageUrl} width={width} />
                        <Box>
                            <IconButton>
                                <ShareOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {/* ROW 1 - PORTFOLIO*/}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={width <= 500 ? "30vh" : '40vh'}
                        borderRadius="5px"
                        border="solid"
                        borderwidth="1px"
                        borderColor={colors.grey[600]}
                        sx={{ background: `linear-gradient(135deg, ${colors.primary[600]} 30%, ${colors.primary[700]} 90%)` }}
                    >
                        <LineChart historicalData={historicalData} onReceiveChartPeriod={handleChartPeriod} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={width <= 500 ? "30vh" : '40vh'}
                        borderRadius="5px"
                        border="solid 1px"
                        borderColor={colors.grey[600]}
                        sx={{
                            background: `linear-gradient(135deg, ${colors.primary[500]} 40%, ${colors.primary[600]} 90%)`
                        }}
                    >
                        {(coins !== null) && (coins !== undefined) && <SomeonePortfolioTable coins={coins} isCollapsed={isCollapsed} />}
                    </Box>
                </Grid>
                {/* ROW 2 - ACHIEVEMENTS*/}
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Box

                        height='11vh'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="5px"
                        border="solid"
                        borderwidth="1px"
                        borderColor={colors.grey[600]}
                        sx={{ background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[600]} 90%)` }}
                    >
                        <StatBox title={aum}
                            subtitle="Assets Under Management"
                            icon={
                                <PaymentsOutlinedIcon
                                    sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                                />
                            }
                            change="false"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Box
                        height='11vh'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="5px"
                        border="solid"
                        borderwidth="1px"
                        borderColor={colors.grey[600]}
                        sx={{ background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[600]} 90%)` }}
                    >
                        <StatBox title={change}
                            subtitle="% Total Change"
                            icon={
                                <SignalCellularAltOutlinedIcon
                                    sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                                />
                            }
                            change="true"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Box
                        height='11vh'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="5px"
                        border="solid"
                        borderwidth="1px"
                        borderColor={colors.grey[600]}
                        sx={{ background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[600]} 90%)` }}
                    >
                        <StatBox title="314"
                            subtitle="Portfolio Believers"
                            icon={
                                <PeopleOutlineRoundedIcon
                                    sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                                />
                            }
                            change="false"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Box
                        height='11vh'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="5px"
                        border="solid"
                        borderwidth="1px"
                        borderColor={colors.grey[600]}
                        sx={{ background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[600]} 90%)` }}
                    >
                        <StatBox title={rank}
                            subtitle="Overall Ranking"
                            icon={
                                <EmojiEventsRoundedIcon
                                    sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                                />
                            }
                            change="false"
                        />
                    </Box>
                </Grid>
                {/* ROW 4 - TRANSACTIONS */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box
                        borderRadius="5px"
                        borderColor={colors.grey[600]}
                        height={width <= 500 ? "30vh" : '40vh'}
                    >
                        <Header title={"Transactions"} subtitle={"History"} width={width} />
                        {(transactions !== null) && (transactions !== undefined) && <TransactionsTable transactions={transactions} onReceiveSwapData={handleSwapData} />}
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default PersonalPortfolio;