import { Typography, Box, useTheme, Button, Avatar } from "@mui/material";
import { tokens } from "../theme";


const Header = ({ title, subtitle, avatarUrl, width }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="15px">
            <Typography
                variant={width <= 500 ? "h4" : "h3"}
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "5px 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h6" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;