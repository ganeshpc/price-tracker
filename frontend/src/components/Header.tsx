import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h4">Price Tracker</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
