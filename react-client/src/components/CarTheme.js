import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 800,
    },
  },
  palette: {
    primary: {
      main: "#fffff0",
    },
    secondary: {
      main: "#80deea",
    },
    palette: {
      background: {
        default: "#fffff0",
      }
    }
  },
});

function CarTheme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
export default CarTheme;
