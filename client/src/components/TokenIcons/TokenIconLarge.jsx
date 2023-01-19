import { SvgIcon } from "@mui/material";

const TokenIconLarge = ({ ...props }) => {
    return (
        <SvgIcon {...props} fontSize="large" viewBox="0 0 32 32">

            <path d={props.svgpath} />
        </SvgIcon>
    );
};

export default TokenIconLarge;