import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";



// black: {
//     100: "#d2d2d4",
//         200: "#a4a5a9",
//             300: "#77777d",
//                 400: "#494a52",
//                     500: "#1c1d27",
//                         600: "#16171f",
//                             700: "#111117",
//                                 800: "#0b0c10",
//                                     900: "#060608"
// },
// white: {
//     100: "#f5ffcc",
//         200: "#ebff99",
//             300: "#e0ff66",
//                 400: "#d6ff33",
//                     500: "#ccff00",
//                         600: "#a3cc00",
//                             700: "#7a9900",
//                                 800: "#526600",
//                                     900: "#293300"
// },
// purple: {
//     100: "#dfccf8",
//         200: "#bf99f0",
//             300: "#9f67e9",
//                 400: "#7f34e1",
//                     500: "#5f01da",
//                         600: "#4c01ae",
//                             700: "#390183",
//                                 800: "#260057",
//                                     900: "#13002c"
// },
// pink: {
//     100: "#f4d2ed",
//         200: "#eaa6da",
//             300: "#df79c8",
//                 400: "#d54db5",
//                     500: "#ca20a3",
//                         600: "#a21a82",
//                             700: "#791362",
//                                 800: "#510d41",
//                                     900: "#280621"
// },



// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            primary: {
                100: "#d2d2d4",
                200: "#a4a5a9",
                300: "#77777d",
                400: "#494a52",
                500: "#1c1d27",
                600: "#16171f",
                700: "#111117",
                800: "#0b0c10",
                900: "#060608",
            },
            greenAccent: {
                100: "#f5ffcc",
                200: "#ebff99",
                300: "#e0ff66",
                400: "#d6ff33",
                500: "#ccff00",
                600: "#a3cc00",
                700: "#7a9900",
                800: "#526600",
                900: "#293300",
            },
            redAccent: {
                100: "#f4d2ed",
                200: "#eaa6da",
                300: "#df79c8",
                400: "#d54db5",
                500: "#ca20a3",
                600: "#a21a82",
                700: "#791362",
                800: "#510d41",
                900: "#280621",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0", // manually changed
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        }),
});

// mui theme settings
// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.redAccent[400],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[600],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontSize: 32,
            },
            h3: {
                fontSize: 24,
            },
            h4: {
                fontSize: 20,
            },
            h5: {
                fontSize: 16,
            },
            h6: {
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};