import { SvgIcon } from "@mui/material";

const TokenIcon = ({ ...props }) => {
    return (
        <SvgIcon {...props} viewBox="0 0 32 32">

            <path d={props.svgpath} />
        </SvgIcon>
    );
};

export default TokenIcon;