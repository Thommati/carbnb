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
      main: "#ffffff",
    },
    secondary: {
      main: "#80deea",
    },
    palette: {
      background: {
        default: "#ffffff",
      }
    }
  },
});

function CarTheme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
export default CarTheme;
