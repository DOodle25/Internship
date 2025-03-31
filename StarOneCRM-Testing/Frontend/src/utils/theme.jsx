const colors = {
    primaryMain: '#031738',
    primaryContrastText: '#FFFFFF',
    secondaryMain: '#201F2F',
    secondaryContrastText: '#FFFFFF',
    hoverBackgroundColor: '#301F2F',
    outlinedBorderColor: '#ffffff',
    outlinedColor: '#000000',
    outlinedHoverBorderColor: '#FFFFF',
    outlinedHoverBackgroundColor: '#FFFFFF',
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
                    color: colors.outlinedColor,
                    backgroundColor:'#FFFFFF',
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
