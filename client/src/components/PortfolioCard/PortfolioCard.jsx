import { Box, Button, IconButton, Typography, useTheme, Card, CardContent, Avatar, Grid, CardHeader, Divider } from "@mui/material";
import { tokens } from "../../theme";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import checkIsUsersPortfolio from "../../services/checkIsUsersPortfolio";


const PortfolioCard = (portfolio) => {

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [userName, setUserName] = useState(null);
    const [aum, setAum] = useState(null);
    const [change, setChange] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [userId, setUserId] = useState(null);


    const handlePortfolioClick = async () => {
        if (userId) {
            const isUsersPortfolio = await checkIsUsersPortfolio(name);
            if (isUsersPortfolio.msg === 'false') {
                navigate('/allportfolios/personalportfolio', { state: { id: userId } });
            } else {
                navigate('/portfolio');
            }
        }
    }

    useEffect(() => {
        setName(portfolio.portfolio.portfolio_name);
        setDescription(portfolio.portfolio.portfolio_description);
        setUserName(portfolio.portfolio.username);
        setAum(portfolio.portfolio.usdValue);
        setChange(portfolio.portfolio.change);
        setImageUrl(portfolio.portfolio.url);
        setUserId(portfolio.portfolio.user_id);
    }, [])


    return (
        <Box m="0 0 0 0" height="100%" width="100%">
            <Card sx={{
                backgroundColor: colors.primary[700], borderRadius: "20px", background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[900]} 90%)`,
                "& :hover": {
                    backgroundColor: colors.primary[500],
                },
                cursor: "pointer"
            }}
                onClick={handlePortfolioClick}
            >

                {/* PORTFOLIO NAME */}
                <CardHeader sx={{}}
                    avatar={
                        <Avatar alt="PC" src={imageUrl} style={{ alignSelf: 'center' }} sx={{ width: 50, height: 50, background: 'transparent', border: "solid 1px", borderColor: colors.grey[200] }}>
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" sx={{ mt: '0px' }}>
                            <FavoriteOutlinedIcon sx={{ color: colors.grey[300], mr: '10px', width: 15, height: 15 }} />
                            <ShareOutlinedIcon sx={{ color: colors.grey[300], width: 15, height: 15 }} />
                        </IconButton>
                    }
                    title={<Typography
                        variant="h5"
                        color={colors.grey[100]}
                        fontWeight="bold"
                    >
                        {name && name.toUpperCase()}
                    </Typography>}>
                </CardHeader>
                <Divider />
                <CardContent sx={{ maxHeight: 500, height: 175 }}>

                    {/* STATS */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
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
                                {aum && aum}
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
                            {change && change.slice(0, 1) === "+" ?
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    fontWeight="bold">
                                    {change && change}
                                </Typography> :
                                <Typography
                                    variant="h5"
                                    color={colors.redAccent[500]}
                                    fontWeight="bold">
                                    {change && change}
                                </Typography>
                            }
                        </Box>
                    </Box>
                    <Divider />
                    {/* DESCRIPTION */}
                    <Typography gutterBottom variant="p" component="div" marginTop="10px">
                        Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description && description.length >= 100 ? description.slice(0, 100) + "..." : description}
                    </Typography>
                </CardContent>
            </Card >
        </Box>
    );
};

export default PortfolioCard;