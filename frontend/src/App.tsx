// import './App.css'

import { createTheme, ThemeProvider } from '@mui/material';
import { brown, grey } from '@mui/material/colors';
import { Provider } from 'react-redux';

import { store } from './store/store';

import Header from './components/Header';
import CoinDataTable from './components/CoinDataTable';

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
      <Provider store={store}>
        <Header></Header>
        <div style={{ height: '100px' }}></div>

        <CoinDataTable></CoinDataTable>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
