import { Typography, Box, useTheme, Button, Avatar } from "@mui/material";
import { tokens } from "../theme";


const PortfolioHeader = ({ title, subtitle, avatarUrl, width }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" >

            <Avatar alt="av" sx={{ width: width <= 500 ? 45 : 60, height: width <= 500 ? 45 : 60, bgcolor: colors.grey[600], border: "solid 1px", borderColor: colors.grey[200], mr: '15px', mb: '15px' }} src={avatarUrl} />


            <Box mb="15px">
                <Typography
                    variant={width <= 500 ? "h4" : 'h5'}
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "5px 0 5px 0" }}
                >
                    {title}
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[400]}>
                    {subtitle}
                </Typography>
            </Box >
        </Box >
    );
};

export default PortfolioHeader;