import { Box, Button, Dialog, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../../theme";
import FormSwap from "./FormSwap";



const ModalDialogSwap = ({ open = false, handleClose, buy = false, tokenInfo, coins }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    return (
        <Dialog open={open} onClose={handleClose} sx={{
            "& .MuiPaper-root": {
                borderRadius: "30px"
            }
        }}>
            <FormSwap handleClose={handleClose} buy={buy} tokenInfo={tokenInfo} coins={coins} />
        </Dialog>
    );
};

export default ModalDialogSwap;