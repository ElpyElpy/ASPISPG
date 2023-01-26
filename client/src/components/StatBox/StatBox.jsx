import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";


const StatBox = ({ title, subtitle, icon, change }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [sign, setSign] = useState(null);


    useEffect(() => {
        setSign(title !== null ? (title[0] === "-" ? "negative" : "positive") : null);
    })




    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" >
                {icon}
                <Box>
                    {change === "false" && <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100], marginLeft: "10px" }}
                    >
                        {title}
                    </Typography>}
                    {change !== "false" && sign == "positive" && <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ color: colors.greenAccent[500], marginLeft: "10px" }}
                    >
                        {title}
                    </Typography>}
                    {change !== "false" && sign == "negative" && <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ color: colors.redAccent[500], marginLeft: "10px" }}
                    >
                        {title}
                    </Typography>}
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.grey[300] }}>
                    {subtitle}
                </Typography>
            </Box>
        </Box >
    );
};

export default StatBox;