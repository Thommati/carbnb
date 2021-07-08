import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 800,
    },
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[800],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

function CarTheme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
export default CarTheme;
