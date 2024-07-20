// import './App.css'

import { createTheme, ThemeProvider } from "@mui/material"
import { brown, grey } from '@mui/material/colors';
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: brown[800],
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
    </ThemeProvider>
  )
}

export default App
