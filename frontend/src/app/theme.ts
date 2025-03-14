'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    colorSchemes: { light: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiGrid2: {
            styleOverrides: {
                root: {
                    padding: 0
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { variant: 'body2' },
                            style: {
                                color: "#951329", fontWeight: 600
                            },
                        },
                    ],
                },
            }
        },
        MuiToggleButton: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    // "&.Mui-selected, &.Mui-selected:hover": {
                    //     backgroundColor: "",
                    //     border: "3px solid #000",

                    // },


                },
            },
        },
        // MuiGrid: {
        //     styleOverrides: {
        //         root: {
        //             "&.MuiGrid-item": {

        //                 padding: 0
        //             }
        //         }
        //     }
        // }
    },
});

export default theme;