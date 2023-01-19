import { Box, Button, IconButton, Typography, useTheme, Card, CardActions, CardContent, Avatar, Grid, CardActionArea } from "@mui/material";
import { tokens } from "../../theme";
import SmallLineChart from "../LineChart/SmallLineChart";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { border } from "@mui/system";


const PortfolioCardTest = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="0 0 0 0" height="100%" width="100%" sx={{
            "& :hover": {
                backgroundColor: colors.primary[500],
            }
        }}>
            <Card sx={{ maxWidth: 345, backgroundColor: colors.primary[500] }}>
                <CardActionArea>
                    {/* PORTFOLIO NAME */}
                    <CardContent>
                        <Box display="flex" sx={{ marginBottom: '30px' }}>
                            <Grid container direction="row" alignItems="center">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ alignSelf: 'center' }} />
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    marginLeft="10px"
                                >
                                    Portfolio name
                                </Typography>
                            </Grid>
                        </Box>
                        {/* Chart */}
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="70px"
                        >
                            <SmallLineChart />
                        </Box>
                        {/* STATS */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="15px" marginBottom="15px">
                            <Box
                                display="flex"
                                justifyContent="start"
                                width="45%"
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold">
                                    AUM:
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="end"
                                width="45%"
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold">
                                    $1 242 212.21
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="15px" marginBottom="15px">
                            <Box
                                display="flex"
                                justifyContent="start"
                                width="45%"
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold">
                                    Total Change:
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="end"
                                width="45%"
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    fontWeight="bold">
                                    +4.21%
                                </Typography>
                            </Box>
                        </Box>

                        {/* DESCRIPTION */}
                        <Typography gutterBottom variant="h6" component="div">
                            Description
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions>

                    <Button size="small" variant="outlined" color="secondary" sx={{ color: colors.grey[100], }}>Believe</Button>
                    <IconButton type="button" sx={{ p: 1 }} >
                        <ShareOutlinedIcon />
                    </IconButton>

                </CardActions>

            </Card >
        </Box>
    );
};

export default PortfolioCardTest;