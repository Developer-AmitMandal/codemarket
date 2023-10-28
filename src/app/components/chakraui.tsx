import { extendTheme } from "@chakra-ui/react";

// Define a custom theme with the desired background color
export const customTheme = extendTheme({
    config: {
        useSystemColorMode: false, // Disable using system color mode (optional)
        initialColorMode: 'light', // Set the initial color mode here (light or dark)
    },
    styles: {
        global: {
            body: {
                bg: '#EEE', // Set the background color to light '#fafafb'
            },
        },
    },
    // ... your other theme configurations ...
});
