import { Box, Button, Dialog, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Form from "./Form";



const ModalDialog = ({ open = false, handleClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Dialog open={open} onClose={handleClose} sx={{
            "& .MuiPaper-root": {
                borderRadius: "50px"
            },
            backgroundColor: "rgba(28, 29, 39, 0.9)"
        }}>
            <Form handleClose={handleClose} />
        </Dialog>
    );
};

export default ModalDialog;