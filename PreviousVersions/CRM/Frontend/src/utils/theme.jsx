// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#2A8A6E',
//             contrastText: '#FFFFFF',
//         },
//         secondary: {
//             main: '#2A8A6E',
//             contrastText: '#FFFFFF',
//         },
//     },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     transition: 'background-color 0.3s ease',
//                     '&:hover': {
//                         backgroundColor: '#246F5A',
//                     },
//                 },
//                 outlined: {
//                     borderColor: '#2A8A6E',
//                     color: '#2A8A6E',
//                     '&:hover': {
//                         borderColor: '#246F5A',
//                         backgroundColor: '#E6F3EF',
//                     },
//                 },
//             },
//         },
//     },
// });

// export default theme;

// const colors = {
//     primaryMain: '#385170',
//     primaryContrastText: '#FFFFFF',
//     secondaryMain: '#142d4c',
//     secondaryContrastText: '#FFFFFF',
//     hoverBackgroundColor: '#142d4c',
//     outlinedBorderColor: '#385170',
//     outlinedHoverBorderColor: '#142d4c',
//     outlinedHoverBackgroundColor: '#ececec',
// };
const colors = {
    primaryMain: '#2e79ba',
    primaryContrastText: '#FFFFFF',
    secondaryMain: '#1e549f',
    secondaryContrastText: '#FFFFFF',
    hoverBackgroundColor: '#1e549f',
    outlinedBorderColor: '#2e79ba',
    outlinedHoverBorderColor: '#1e549f',
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
