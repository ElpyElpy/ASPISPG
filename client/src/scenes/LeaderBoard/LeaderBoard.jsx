import Header from "../../components/Header";
import { Box, IconButton, Card, useTheme, CardContent, Grid, Avatar, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import LeaderboardTable from "../../components/LeaderBoardTable/LeaderboardTable";


const LeaderBoard = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [transactions, setTransactions] = useState(null);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"LEADERBOARD"} subtitle={"Observe current results"} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <IconButton>
                            <ShareOutlinedIcon sx={{ color: colors.grey[100] }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box
                height="75vh"
            >
                <LeaderboardTable />
            </Box>

        </Box>
    )
}

export default LeaderBoard;