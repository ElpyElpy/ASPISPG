import { Box, IconButton, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox/StatBox";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import PortfolioTable from "../../components/PortfolioTable/PortfolioTable";
import LineChart from "../../components/LineChart/LineChart"
import { useEffect, useState } from "react";
import fetchPortfolioData from "../../services/fetchPortfolioData";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";




const Portfolio = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [coins, setCoins] = useState(null);
    const [aum, setAum] = useState(null);
    const [change, setChange] = useState(null);
    const [gotToken, setGotToken] = useState(false);
    const [transactions, setTransactions] = useState(null);


    useEffect(() => {
        async function getCoins() {
            const data = await fetchPortfolioData();
            setCoins(data.portfolio);
            setAum(data.aum);
            setChange(data.changeTotal);
            setTransactions(data.transactions);
        }
        getCoins();
    }, [gotToken])

    const handleSwapData = async (status) => {
        setGotToken(!gotToken);
    }


    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"PORTFOLIO"} subtitle={"Observe your results"} />
                <Box>
                    <IconButton>
                        <ShareOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="12vh"
                gap="20px"
            >
                {/* ROW 1 - PORTFOLIO*/}
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={colors.primary[500]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="5px"
                    border="solid"
                    borderwidth="1px"
                    borderColor={colors.grey[600]}
                >
                    <LineChart />
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {(coins !== null) && (coins !== undefined) && <PortfolioTable coins={coins} onReceiveSwapData={handleSwapData} />}
                </Box>
                {/* ROW 2 - ACHIEVEMENTS*/}
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={colors.primary[400]}
                    borderRadius="5px"
                    border="solid"
                    borderwidth="1px"
                    borderColor={colors.grey[600]}
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
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={colors.primary[400]}
                    borderRadius="5px"
                    border="solid"
                    borderwidth="1px"
                    borderColor={colors.grey[600]}
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
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={colors.primary[400]}
                    borderRadius="5px"
                    border="solid"
                    borderwidth="1px"
                    borderColor={colors.grey[600]}
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
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={colors.primary[400]}
                    borderRadius="5px"
                    border="solid"
                    borderwidth="1px"
                    borderColor={colors.grey[600]}
                >
                    <StatBox title="121 place"
                        subtitle="Overall Ranking"
                        icon={
                            <EmojiEventsRoundedIcon
                                sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                            />
                        }
                        change="false"
                    />
                </Box>
                {/* ROW 4 - TRANSACTIONS */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"

                    borderRadius="5px"
                    borderColor={colors.grey[600]}
                >
                    <Header title={"Transactions"} subtitle={"History"} />
                    {(transactions !== null) && (transactions !== undefined) && <TransactionsTable transactions={transactions} onReceiveSwapData={handleSwapData} />}
                </Box>
            </Box>
        </Box>
    )
}

export default Portfolio;