const colors = {
    primaryMain: '#201F2F',
    primaryContrastText: '#FDB8DC',
    secondaryMain: '#201F2F',
    secondaryContrastText: '#FFFFFF',
    hoverBackgroundColor: '#301F2F',
    outlinedBorderColor: '#201F2F',
    outlinedHoverBorderColor: '#201F2F',
    outlinedHoverBackgroundColor: '#ececec',
};

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primaryMain,
            contrastText: colors.primaryContrastText,
        },
        secondary: {
            main: colors.secondaryMain,
            contrastText: colors.secondaryContrastText,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: colors.hoverBackgroundColor,
                    },
                },
                outlined: {
                    borderColor: colors.outlinedBorderColor,
                    color: colors.outlinedBorderColor,
                    '&:hover': {
                        borderColor: colors.outlinedHoverBorderColor,
                        backgroundColor: colors.outlinedHoverBackgroundColor,
                    },
                },
            },
        },
    },
});

export default theme;
